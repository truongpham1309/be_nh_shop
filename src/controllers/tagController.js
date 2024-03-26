import tags from "./../models/tags/tags.js"

export const createTag = async (req, res) => {
    try {
        const data = await tags.create(req.body);

        if (!data) {
            return res.status(403).json({
                message: "Create tag failed",
            })
        }

        return res.status(200).json({
            message: "Tag created successfully",
            tag: data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: message.name || "Unknown error",
        })
    }
}