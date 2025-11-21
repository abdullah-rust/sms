CREATE DATABASE schooldb; 


CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,  
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    student_count INT DEFAULT 0,
    UNIQUE (class_name, section)
);

CREATE TABLE students (
    roll_number SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class_id INT REFERENCES classes(id),
    contact VARCHAR(50),
    dob DATE,
    UNIQUE (roll_number, class_id)
);



CREATE TABLE teachers (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    contact VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teacher_classes (
  teacher_id INT REFERENCES teachers(employee_id),
  class_id INT REFERENCES classes(id),
  PRIMARY KEY (teacher_id, class_id)
);



CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, 
    UNIQUE (student_id, date)
);


CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id), 
    subject VARCHAR(100) NOT NULL,
    exam_name VARCHAR(100) NOT NULL,
    marks INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO admin(name,password)
VALUES ('admin','226622');