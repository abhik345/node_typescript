import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Post from "./post.model";

interface PostImageAttributes {
    id: number;
    postId: number;
    imageUrl: string;
}

interface PostImageCreationAttributes extends Optional<PostImageAttributes, "id"> {}

export class PostImage extends Model<PostImageAttributes, PostImageCreationAttributes> implements PostImageAttributes {
    public id!: number;
    public postId!: number;
    public imageUrl!: string;
}

PostImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,  
                key: "id"
            },
            onDelete: "CASCADE" 
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "post_images",
        timestamps: true
    }
);

Post.hasMany(PostImage, { foreignKey: "postId", as: "postImages" });
PostImage.belongsTo(Post, { foreignKey: "postId", as: "post" }); 

export default PostImage;
