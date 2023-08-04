import * as mongoose from "mongoose";

interface BlogsDocument extends mongoose.Document {
  name: string;
  category: string;
  publishedAt: number;
}

interface IBlogsModel extends mongoose.Model<BlogsDocument> {}

// Tao schema
const blogsSchema: mongoose.Schema<BlogsDocument, IBlogsModel> =
  new mongoose.Schema<BlogsDocument, IBlogsModel>({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Number,
      required: true,
    },
  });

const BlogsModel: IBlogsModel = mongoose.model<
  BlogsDocument,
  IBlogsModel
>("blogs", blogsSchema);

export default BlogsModel;
