import User from "./user.model";
import Post from "./post.model";
import PostImage from "./postImage.model";
import Comment from "./comments.model";


const initModels = async () => {
  await User.sync({ alter: true }); 
  await Post.sync({ alter: true }); 
  await PostImage.sync({ alter: true });
  await Comment.sync({ alter: true });
};

export { User, Post,PostImage, initModels };
