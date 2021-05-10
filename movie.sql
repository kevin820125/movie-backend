-- psql -f movie.sql


\echo 'Delete and recreate movie db?'
\prompt 'Return for yes or control-C to cancel > ' foo

drop database movie;
create database movie;
\connect movie
\i movie-schema.sql
\i movie-seed.sql

\echo 'Delete and recreate movie_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

drop database movie_test;
create database movie_test;
\connect movie_test;
\i movie-schema.sql





