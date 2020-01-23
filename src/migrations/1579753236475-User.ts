import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1579753236475 implements MigrationInterface {
    name = 'User1579753236475';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "CREATE TABLE `users` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `first_name` varchar(255) NULL, `last_name` varchar(255) NULL, `role` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', `email` varchar(255) NULL, `password` varchar(255) NULL, `phone` varchar(255) NULL, `avatar` varchar(255) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
            undefined,
        );
        await queryRunner.query(
            "INSERT INTO nest_shopping.users (id, created_at, updated_at, first_name, last_name, role, email, password, phone, avatar) VALUES ('eca4c9a8-c975-4b2e-aa48-c5791c5c1ff6', '2020-01-23 05:47:22.923147', '2020-01-23 05:47:22.923147', 'GU', 'XUKAI', 'USER', '1378026744@qq.com', '$2b$10$iUv9JVNr7JkclfLp2BsGvORbMuPFigwSn7aYIX4NSy459oIBw1YZS', null, null);",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`',
            undefined,
        );
        await queryRunner.query('DROP TABLE `users`', undefined);
    }
}
