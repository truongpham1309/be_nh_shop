  import mongoose from "mongoose";

  const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    actor: { type: String, required: true },
    duration: { type: Number, required: true },
    release_date: { type: Date, required: true },
    end_date: { type: Date },
    status: {
      type: String,
      enum: ['Currently Showing', 'Coming Soon', 'Stopped Showing'],
      required: true
    },
    is_early_showtime: { type: Boolean, default: false },
    rated: {
      type: String,
      enum: ['P', 'C13', 'C16', 'C18'],
      required: true
    },
    like: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
    trailer: { type: String },
    deleted: { type: Boolean, default: false },
    created_by: { type: mongoose.Schema.Types.ObjectId },
    updated_by: { type: mongoose.Schema.Types.ObjectId }
  }, {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.created_by;
        delete ret.updated_by;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      }
    }
  });

  export default mongoose.model('Movie', movieSchema);
