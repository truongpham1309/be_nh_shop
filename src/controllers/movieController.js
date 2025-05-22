import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

// GET /api/dashboard/movie
export const index = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const order = req.query.order === 'asc' ? 1 : -1;
        const sort = req.query.sort || 'createdAt';
        const currentDate = new Date().toISOString().split('T')[0];

        const movies = await Movie.find({ deleted: false })
            .sort({ [sort]: order })
            .limit(limit);

        // Cập nhật trạng thái song song
        await Promise.all(movies.map(async (movie) => {
            const releaseDate = movie.release_date?.toISOString().split('T')[0];
            const endDate = movie.end_date?.toISOString().split('T')[0];

            if (currentDate > endDate) {
                movie.status = 'Stopped Showing';
                movie.is_early_showtime = false;
                return movie.save();
            } else if (currentDate >= releaseDate && currentDate <= endDate) {
                movie.status = 'Currently Showing';
                movie.is_early_showtime = false;
                return movie.save();
            }
        }));

        const total = await Movie.countDocuments({ deleted: false });
        return res.status(200).json({
            success: true,
            data: {
                movies,
                meta: {
                    total,
                    perPage: limit,
                    currentPage: 1,
                    lastPage: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        return res.status(502).json({ success: false, message: error.message });
    }
};


// GET /api/dashboard/movie/:id
export const show = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id, deleted: false });
        if (!movie) return res.status(400).json({ success: false, message: 'Không tìm thấy phim' });
        return res.status(200).json({ success: true, data: { movie } });
    } catch (error) {
        return res.status(502).json({ success: false, message: error.message });
    }
};

// POST /api/dashboard/movie/create
export const store = async (req, res) => {
    try {
        const data = req.body;
        const newMovie = new Movie(data);
        await newMovie.save();
        return res.status(200).json({ success: true, message: 'Thêm phim thành công' });
    } catch (error) {
        return res.status(502).json({ success: false, message: error.message });
    }
};

// PUT /api/dashboard/movie/update/:id
export const update = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id, deleted: false });
        if (!movie) return res.status(404).json({ success: false, message: 'Không tìm thấy phim' });

        // Giả định kiểm tra showtime ở nơi khác
        const hasUpcomingShowtimes = false;

        if (hasUpcomingShowtimes) {
            return res.status(403).json({
                success: false,
                message: 'Không thể cập nhật phim đang có suất chiếu hoạt động và có vé đã đặt.'
            });
        }

        Object.assign(movie, req.body);
        await movie.save();
        return res.status(200).json({ success: true, message: 'Cập nhật phim thành công' });
    } catch (error) {
        return res.status(502).json({ success: false, message: error.message });
    }
};

// DELETE /api/dashboard/movie/delete/:id
export const destroy = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const movie = await Movie.findOne({ _id: req.params.id, deleted: false });
        if (!movie) throw new Error('Không tìm thấy phim');

        const hasUpcomingShowtimes = false;
        const hasRelatedRecords = false;

        if (hasUpcomingShowtimes) {
            return res.status(403).json({
                success: false,
                message: 'Không thể xóa phim đang có suất chiếu hoạt động và có vé đã đặt.'
            });
        }

        if (hasRelatedRecords) {
            movie.deleted = true;
            await movie.save();
        } else {
            await Movie.deleteOne({ _id: req.params.id });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ success: true, message: 'Xóa phim thành công' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(502).json({ success: false, message: error.message });
    }
};
