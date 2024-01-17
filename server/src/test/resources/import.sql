CREATE TABLE `roles` (
                                          id BIGINT PRIMARY KEY,
                                          name VARCHAR(255)
);
insert into roles (name) values ('ROLE_USER');
insert into roles (name) values ('ROLE_MODERATOR');
insert into roles (name) values ('ROLE_ADMIN');