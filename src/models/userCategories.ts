import { UserSetCategory } from "@/interface/dto/request/userRequest";
import { 
    AutoIncrement, 
    BelongsTo, 
    Column, 
    DataType, 
    AllowNull,
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique } from "sequelize-typescript"
import Category from "./categories";
import User from "./users";
import rm from "../constant/resultMessage";

@Table({ // 테이블 설정
    modelName: "UserCategory",
    tableName: "userCategories",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: false,
    charset: "utf8", 
    collate: "utf8_general_ci", 
})

export default class UserCategory extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    user_id!: number;

    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    category_id!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    next_item_id!: number;

    @BelongsTo(() => Category)
    comment!: Category;

    @BelongsTo(() => User)
    user!: User;

    static async setUserCategory(request: UserSetCategory): Promise<void> {
        await this.create({ ...request });
    }

    static async findCategoryByUserId(id: number): Promise<number[]> {
        const isCategories =  await this.findAll({
            where: { id },
            attributes: ["category_id"]
        });
        if (!isCategories) throw new Error(rm.NULL_VALUE);
        const categories: number[] = [];
        isCategories.forEach(it => {
            const item = it.getDataValue("category_id") as number;
            categories.push(item);
        });
        return categories;
    }
}