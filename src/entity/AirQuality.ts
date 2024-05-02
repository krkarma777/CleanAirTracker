import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class AirQuality extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ nullable: true })
    so2Grade: string | undefined;

    @Column({ nullable: true })
    coFlag: string | undefined;

    @Column({ nullable: true })
    khaiValue: string | undefined;

    @Column({ nullable: true })
    so2Value: string | undefined;

    @Column({ nullable: true })
    coValue: string | undefined;

    @Column({ nullable: true })
    pm25Flag: string | undefined;

    @Column({ nullable: true })
    pm10Flag: string | undefined;

    @Column({ nullable: true })
    o3Grade: string | undefined;

    @Column({ nullable: true })
    pm10Value: string | undefined;

    @Column({ nullable: true })
    khaiGrade: string | undefined;

    @Column({ nullable: true })
    pm25Value: string | undefined;

    @Column()
    sidoName: string | undefined;

    @Column({ nullable: true })
    no2Flag: string | undefined;

    @Column({ nullable: true })
    no2Grade: string | undefined;

    @Column({ nullable: true })
    o3Flag: string | undefined;

    @Column({ nullable: true })
    pm25Grade: string | undefined;

    @Column({ nullable: true })
    so2Flag: string | undefined;

    @Column()
    dataTime: string | undefined;

    @Column({ nullable: true })
    coGrade: string | undefined;

    @Column({ nullable: true })
    no2Value: string | undefined;

    @Column()
    stationName: string | undefined;

    @Column({ nullable: true })
    pm10Grade: string | undefined;

    @Column({ nullable: true })
    o3Value: string | undefined;
}
