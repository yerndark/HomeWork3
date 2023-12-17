const express = require('express');
const fs = require('fs');

const studentsRouter = express.Router();


const studentsFilePath = './students.json';


const loadStudents = () => {
  try {
    const data = fs.readFileSync(studentsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    
    return [];
  }
};


const saveStudents = (students) => {
  fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2), 'utf-8');
};

studentsRouter.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }

  const students = loadStudents();
  students.push({ name });
  saveStudents(students);

  res.status(201).send(`Student ${name} added successfully`);
});

studentsRouter.get('/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const students = loadStudents();

  if (index >= 0 && index < students.length) {
    res.send(students[index]);
  } else {
    res.status(404).send('Student not found');
  }
});

studentsRouter.delete('/:name', (req, res) => {
  const nameToDelete = req.params.name;
  const students = loadStudents();

  const updatedStudents = students.filter((student) => student.name !== nameToDelete);
  saveStudents(updatedStudents);

  res.send(`Student ${nameToDelete} deleted successfully`);
});

module.exports = studentsRouter;