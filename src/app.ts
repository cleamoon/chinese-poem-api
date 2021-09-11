import express from "express";
import * as bodyParser from "body-parser";
import {connect} from "./db/db";
import { Poem } from "./db/models/Poem.model";
import { getRepository } from "typeorm";
import { moveEmitHelpers } from "typescript";

connect();

const app = express();

app.use(bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
        encoding = "utf-8";
    }
}));

app.get("/poem", async(req, res) => {
    const poem = await Poem.find();
    res.send(poem);
});

app.get("/poem/:id", async(req, res) => {
    const poem = await Poem.findOne({
        where: {
            id: req.params.id
        }
    });
    if (poem) {
        res.json(poem);
    } else {
        res.status(404).send({message: "Poem not found"})
    }
});

app.post("/poem", async(req, res) => {
    const poem = new Poem();
    poem.title = req.body.title;
    poem.poet = req.body.poet;
    poem.line1 = req.body.line1;
    poem.line2 = req.body.line2;
    await poem.save();
    res.send(poem);
});

app.put("/poem/:id", async(req, res) => {
    const poem = await Poem.findOne({
        where: {
            id: req.params.id
        }
    });
    if (poem) {
        poem.title = req.body.title;
        poem.poet = req.body.poet;
        poem.line1 = req.body.line1;
        poem.line2 = req.body.line2;
        await poem.save();
        res.send(poem);
    } else {
        res.status(404).send({message: "Poem not found"})
    }
});

app.delete("/poem/:id", async (req, res) => {
    const poem = await Poem.findOne({
        where: {
            id: req.params.id
        }
    });
    if (poem) {
        await poem.remove();
        res.json({message: "Poem deleted"});
    } else {
        res.status(404).send({message: "Poem not found"})
    }
});

// Limit access rate to 100 per 15 minutes
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter)

export {app};