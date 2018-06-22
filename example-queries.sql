-- get all the todos
select * from todos;

-- get one todo by id
select * from todos
where id=2;

-- get all pending todos that are not done
select * from todos
where isDone=false;

-- get all completed todos
select * from todos
where isDone=true;

-- get all searched by title results
select * from todos
where title ilike '%buy%';

-- search by title, should have 0 results when random text
select * from todos
where title ilike '%zzzzzz%';

-- update status of todos by id
update todos
set isDone=false
where id=1;

-- updates status of todos by id
update todos
set isDone=true
where id=1;

-- update title of todos 
update todos
set title='GO SKATE'
where id=1;

-- delete todos by id
delete from todos
where id=4;

-- delete todos by checking completed status
delete from todos
where isDone=true;