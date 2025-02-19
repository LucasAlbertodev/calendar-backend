const { response } = require('express');
const Event = require('../models/Event');
const e = require('cors');


const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    try {
        res.json({
            ok: true,
            events
        })

    } catch (error) {
        console.log(error)

    }
};


const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }
        )

    }
};

const updateEvents = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event : eventUpdate
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
};

const deleteEvents = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        };

        if ( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        };

     await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
};

module.exports = { getEvents, createEvent, updateEvents, deleteEvents }