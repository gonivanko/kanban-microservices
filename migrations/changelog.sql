--liquibase formatted sql

--changeset flaksie:1
create table users
(
    id            int primary key auto_increment,
    username      varchar(255) not null unique,
    email         varchar(255) not null unique,
    password_hash varchar(255)
);
create table projects
(
    id          int primary key auto_increment,
    name        varchar(255) unique not null,
    description varchar(255),
    owner_id    int                 not null,
    foreign key (owner_id) references users (id)
);
create table boards
(
    id          int primary key auto_increment,
    name        varchar(255) unique not null,
    description varchar(255),
    project_id  int                 not null,
    foreign key (project_id) references projects (id)
);
create table columns
(
    id           int primary key auto_increment,
    board_id     int                 not null,
    name         varchar(255) unique not null,
    position     int not null,
    is_finishing bool                not null default false,
    foreign key (board_id) references boards (id)
);
create table tasks
(
    id           int primary key auto_increment,
    title        varchar(255) not null,
    description  varchar(255),
    is_completed bool         not null default false,
    position     int          not null,
    column_id    int          not null,
    foreign key (column_id) references columns (id)
);

create table task_comments
(
    id      int primary key auto_increment,
    text    Text not null,
    task_id int  not null,
    user_id int  not null,
    foreign key (task_id) references tasks (id),
    foreign key (user_id) references users (id)
);

create table user_board_roles(
       id int primary key auto_increment,
       user_id int not null,
       board_id int not null,
       role varchar(255) not null,
       foreign key(user_id) references users(id),
       foreign key(board_id) references boards(id)
);

--changeset flaksie:2
alter table users add column email_confirmed bool not null default false;

--changeset flaksie:3
alter table users add column created_at datetime not null;
alter table users add column updated_at datetime not null;

--changeset flaksie:4
alter table users add column deleted_at datetime;
alter table users change column updated_at updated_at datetime;

--changeset flaksie:5
alter table projects add column deleted_at datetime;
alter table projects add column updated_at datetime;
alter table projects add column created_at datetime not null;
