/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2023-07-29 23:06:44                          */
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
   primary key (COU_ID)
);

/*==============================================================*/
/* Table: EDUCATIONTYPE                                         */
/*==============================================================*/
create table EDUCATIONTYPE
(
   TYPE_ID              int auto_increment not null,
   TYPE_NAME            longtext not null,
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
   primary key (YEAR_ID)
);

/*==============================================================*/
/* Table: PERIOD                                                */
/*==============================================================*/
create table PERIOD
(
   PER_ID               int auto_increment not null,
   PER_CODE             varchar(20) not null,
   primary key (PER_ID)
);

/*==============================================================*/
/* Table: ROOM                                                  */
/*==============================================================*/
create table ROOM
(
   ROOM_ID              int auto_increment not null,
   ROOM_NAME            longtext not null,
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
   SLOT_WEEKEND         bool not null,
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

