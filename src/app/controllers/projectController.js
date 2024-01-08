const express = require("express")
const authMiddleware = require("../middlewares/auth")
const Project = require("../models/project")
const Task = require("../models/task")

const router = express.Router()

router.use(authMiddleware)
//criar rota para listar os projetos do usuário
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate(["user", "tasks"])

    return res.status(200).send({ projects })
  } catch (err) {
    return res.status(400).send({ error: "Error loading projects" })
  }
})

router.get("/:projectId", async (req, res) => {
  try {
    //retorna somente os dados do projeto
    // const project = await Project.findById(req.params.projectId)
    //retorna os dados do projeto + os dados do usuário atrelado a ele
    const project = await Project.findById(req.params.projectId).populate([
      "user",
      "tasks",
    ])

    return res.status(200).send({ project })
  } catch (err) {
    return res.status(400).send({ error: "Error loading the project" })
  }
})

router.get("/", async (req, res) => {
  try {
    //retorna somente os dados do projeto
    // const project = await Project.findById(req.params.projectId)
    //retorna os dados do projeto + os dados do usuário atrelado a ele
    const project = await Project.find({ user: req.query.userId }).populate([
      "user",
      "tasks",
    ])

    return res.status(200).send({ project })
  } catch (err) {
    return res.status(400).send({ error: "Error loading the project" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, description, tasks } = req.body

    const project = await Project.create({
      title,
      description,
      user: req.userId,
    })

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({ ...task, project: project._id })

        await projectTask.save()

        project.tasks.push(projectTask)
      })
    )

    await project.save()

    return res.status(200).send({ project, msg: "Projeto criado com sucesso!" })
    //return res.status(200).send({ ...project._doc, msg: "Projeto criado com sucesso!" })
  } catch (err) {
    return res.status(400).send({ error: "Error creating a new project" })
  }
})

router.put("/:projectId", async (req, res) => {
  try {
    const { title, description, tasks } = req.body

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        description,
      },
      { new: true }
    )

    project.tasks = []
    await Task.deleteMany({ project: project._id })
    
    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({ ...task, project: project._id })

        await projectTask.save()

        project.tasks.push(projectTask)
      })
    )

    await project.save()

    return res.status(200).send({ project, msg: "Projeto criado com sucesso!" })
    //return res.status(200).send({ ...project._doc, msg: "Projeto criado com sucesso!" })
  } catch (err) {
    return res.status(400).send({ error: "Error updating project" })
  }
})

router.delete("/:projectId", async (req, res) => {
  try {
    //const project = await Project.findById(req.params.projectId)
    //project.tasks = []
    //await Task.deleteMany({ project: project._id })
    await Task.deleteMany({ project: req.params.projectId })
    await Project.deleteOne({ _id: req.params.projectId })
    //await Project.findByIdAndDelete(req.params.projectId)

    return res.status(200).send({ msg: "Projeto deletado com sucesso" })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "Error deleting the project" })
  }
})

module.exports = (app) => app.use("/projects", router)
