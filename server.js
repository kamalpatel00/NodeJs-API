const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

port = process.env.PORT || 4000;

const courses = [
  { id: 1, name: "kamal" },
  { id: 2, name: "raj" },
  { id: 3, name: "hell" }
];

app.get("/", (req, res) => {
  res.send(courses);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(d => d.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(d => d.id === parseInt(req.params.id));
  if (!cousce)
    return res.status(404).send("The course with given id is not found");

  //call validate function for input validation

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(2)
      .required()
  };
  return Joi.validate(course, schema);
}

//Delete specific records with valid id

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(d => d.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// app.get("/api/cources/:year/:month", (req, res) => {
//   res.send(req.query);
// });

app.listen(port, () => {
  console.log("Server is Running on PORT: " + port);
});
