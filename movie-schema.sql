create table users(
    username varchar(25) not null primary key,
    password text not null,
    email text not null 
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    photourl text
);

--  this is a problem
create table watchlist(
    username varchar(25) not null references users(username) on delete cascade,
    movieId integer not null
);



create table commentarea(
    id serial primary key,
    username varchar(25) not null references users(username),
    movieId integer not null,
    comment text CONSTRAINT commentchk check(char_length(comment) > 10 and char_length(comment) < 255)
);