import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AirQuality extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ nullable: true, type: "varchar" })
    so2Grade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    coFlag: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    khaiValue: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    so2Value: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    coValue: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm25Flag: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm10Flag: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    o3Grade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm10Value: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    khaiGrade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm25Value: string | undefined;

    @Column({ nullable: false, type: "varchar" })
    sidoName: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    no2Flag: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    no2Grade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    o3Flag: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm25Grade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    so2Flag: string | undefined;

    @Column({ nullable: false, type: "varchar" })
    dataTime: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    coGrade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    no2Value: string | undefined;

    @Column({ nullable: false, type: "varchar" })
    stationName: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    pm10Grade: string | undefined;

    @Column({ nullable: true, type: "varchar" })
    o3Value: string | undefined;
}
