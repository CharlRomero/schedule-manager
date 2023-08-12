/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2023-08-12 16:14:55                          */
/*==============================================================*/


drop table if exists COURSE;

drop table if exists EDUCATIONTYPE;

drop table if exists EDUCATIONYEAR;

drop table if exists PERIOD;

drop table if exists ROOM;

drop table if exists SLOT;

drop table if exists SUBJECT;

/*==============================================================*/
/* Table: COURSE                                                */
/*==============================================================*/
create table COURSE
(
   COU_ID               int auto_increment not null,
   YEAR_ID              int not null,
   PER_ID               int not null,
   ROOM_ID              int not null,
   COU_STATUS           bool not null default 1,
   primary key (COU_ID)
);

/*==============================================================*/
/* Table: EDUCATIONTYPE                                         */
/*==============================================================*/
create table EDUCATIONTYPE
(
   TYPE_ID              int auto_increment not null,
   TYPE_NAME            longtext not null,
   TYPE_STATUS          bool not null default 1,
   primary key (TYPE_ID)
);

/*==============================================================*/
/* Table: EDUCATIONYEAR                                         */
/*==============================================================*/
create table EDUCATIONYEAR
(
   YEAR_ID              int auto_increment not null,
   TYPE_ID              int not null,
   YEAR_LEVEL           varchar(10) not null,
   YEAR_STATUS          bool not null default 1,
   primary key (YEAR_ID)
);

/*==============================================================*/
/* Table: PERIOD                                                */
/*==============================================================*/
create table PERIOD
(
   PER_ID               int auto_increment not null,
   PER_CODE             varchar(20) not null,
   PER_STATUS           bool not null default 1,
   primary key (PER_ID)
);

/*==============================================================*/
/* Table: ROOM                                                  */
/*==============================================================*/
create table ROOM
(
   ROOM_ID              int auto_increment not null,
   ROOM_NAME            longtext not null,
   ROOM_STATUS          bool not null default 1,
   primary key (ROOM_ID)
);

/*==============================================================*/
/* Table: SLOT                                                  */
/*==============================================================*/
create table SLOT
(
   SLOT_ID              int auto_increment not null,
   SLOT_INITIME         time not null,
   SLOT_ENDTIME         time not null,
   SLOT_WEEKEND         bool not null default 0,
   SLOT_DAY             int not null default 0,
   SLOT_STATUS          bool not null default 1,
   primary key (SLOT_ID)
);

/*==============================================================*/
/* Table: SUBJECT                                               */
/*==============================================================*/
create table SUBJECT
(
   SUB_ID               int auto_increment not null,
   SLOT_ID              int not null,
   COU_ID               int not null,
   SUB_NAME             varchar(120) not null,
   SUB_STATUS           bool not null default 1,
   primary key (SUB_ID)
);

alter table COURSE add constraint FK_RELATIONSHIP_3 foreign key (YEAR_ID)
      references EDUCATIONYEAR (YEAR_ID) on delete restrict on update restrict;

alter table COURSE add constraint FK_RELATIONSHIP_4 foreign key (PER_ID)
      references PERIOD (PER_ID) on delete restrict on update restrict;

alter table COURSE add constraint FK_RELATIONSHIP_5 foreign key (ROOM_ID)
      references ROOM (ROOM_ID) on delete restrict on update restrict;

alter table EDUCATIONYEAR add constraint FK_RELATIONSHIP_6 foreign key (TYPE_ID)
      references EDUCATIONTYPE (TYPE_ID) on delete restrict on update restrict;

alter table SUBJECT add constraint FK_CORRESPONDS foreign key (SLOT_ID)
      references SLOT (SLOT_ID) on delete restrict on update restrict;

alter table SUBJECT add constraint FK_HAS foreign key (COU_ID)
      references COURSE (COU_ID) on delete restrict on update restrict;

create view COURSE_VW as select YEAR_LEVEL, ROOM_NAME, TYPE_NAME, PER_CODE from course c, period p, room r, educationyear e, educationtype t where c.YEAR_ID = e.YEAR_ID and t.TYPE_ID = e.TYPE_ID and c.PER_ID = p.PER_ID and c.ROOM_ID = r.ROOM_ID;

insert into room (ROOM_NAME) values ('A');
insert into room (ROOM_NAME) values ('B');
insert into room (ROOM_NAME) values ('C');

insert into period (PER_CODE) values ('2021-2022');
insert into period (PER_CODE) values ('2022-2023');

insert into educationtype (TYPE_NAME) values ('Educación Básica');
insert into educationtype (TYPE_NAME) values ('Educación Inicial');

insert into educationyear (TYPE_ID, YEAR_LEVEL) values (1, '1ero'), (1, '2do'), (1, '3ero'), (2, '1ero'), (2, '2do'), (2, '3ero');

insert into slot (SLOT_INITIME, SLOT_ENDTIME) values ('07:00', '07:30'), ('08:00', '08:30'), ('09:00', '09:30');

insert into course (YEAR_ID, PER_ID, ROOM_ID) values (1,1,1),(1,1,2),(1,1,3),(2,1,1),(2,1,2),(2,1,3),(3,1,1),(3,1,2),(3,1,3),(1,2,1),(1,2,2),(1,2,3);