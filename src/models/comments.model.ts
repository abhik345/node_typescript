import { DataTypes,Model,Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";
import Post from "./post.model";


interface CommentAttributes {
  id: number;
  content: string;
  postId: number;
  userId : number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public content!: string;
    public postId!: number;
    public userId!: number;
}

Comment.init(
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        postId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : Post,
                key : 'id'
            },
            onDelete : 'CASCADE'
        },
        userId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : User,
                key : 'id'
            },
            onDelete : 'CASCADE'
        }
    },{
        sequelize,
        tableName: 'comments',
        timestamps: true

    }
)

User.hasMany(Comment,{foreignKey : 'userId', as : 'comments'});
Comment.belongsTo(User,{foreignKey : 'userId', as : 'user'});
Post.hasMany(Comment,{foreignKey : 'postId', as : 'comments'});
Comment.belongsTo(Post,{foreignKey : 'postId', as : 'post'});

export default Comment;