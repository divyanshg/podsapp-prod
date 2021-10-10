require("dotenv").config();
const _show = require("express").Router();
const Show = require("../models/Show");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");

// _show.get("/all/:page/:per_page", async(req, res) => {
//     const shows = await Show.find()
//     res.json(paginator(shows, req.params.page, req.params.per_page))
// })

_show.get("/tailored", auth, async (req, res) => {
    var response = [
        {
            id: "RPS",
            title: "Recently Played",
            shows: [],
        },
        {
            id: "MFYS",
            title: "Made for Divyansh Gupta",
            shows: [
                {
                    id: 1,
                    image: "whenWeAllFallAsleep",
                    title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
                    channel: "Billie Ellish",
                },
                {
                    id: 2,
                    image: "bornToDie",
                    title: "Born To Die",
                    channel: "Lana Del Ray",
                },
                {
                    id: 3,
                    image: "comeAroundSundown",
                    title: "Come Around Sundown",
                    channel: "Kings of Leon",
                },
                {
                    id: 4,
                    image: "housesOfTheHoly",
                    title: "Houses Of The Holy",
                    channel: "GOD",
                },
                {
                    id: 5,
                    image: "illuminate",
                    title: "Illuminate",
                    channel: "Light House",
                },
                {
                    id: 6,
                    image: "theLonesomeCrowdedWest",
                    title: "The Lonesome Crowded West",
                    channel: "Modest Mouse",
                },
                {
                    id: 7,
                    image: "stadiumArcadium",
                    title: "Stadium Arcadium",
                    channel: "Red Chili",
                },
                {
                    id: 8,
                    image: "blankFaceLp",
                    title: "Blank Face LP",
                    channel: "Black House",
                },
            ],
        },
        {
            id: "ADS",
        },
    ];

    await Show.find()
        .select({
            title: 1,
            image: 1,
            ShowId: 1,
        })
        .then((shows) => {
            shows.forEach((show) => {
                response[0].shows.push(show);
            });
            return res.json(response);
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

_show.get("/:id", auth, async (req, res) => {
    const show = await Show.findOne({
        ShowId: req.params.id,
    });
    res.json(show);
});

_show.get("/channel/:cid", auth, async (req, res) => {
    const ChannelId = req.params.cid;
    const shows = await Show.find({
        ChannelId,
    });
    res.json(shows);
});

_show.post("/new/:id", auth, async (req, res) => {
    var show = req.body;

    show["ShowId"] = uuidv4();
    show["UserId"] = req.user.UserId;
    show["ChannelId"] = req.params.id;

    const newShow = new Show(show);
    await newShow.save();
    res.json(show);
});

_show.put("/follow/:id", auth, async (req, res) => {
    const follower = {
        userId: req.user.UserId,
    };
    const ShowId = req.params.id;
    await Show.findOneAndUpdate(
        {
            ShowId,
        },
        {
            $push: {
                Followers: follower,
            },
        }
    );
    res.sendStatus(200);
});

_show.patch("/update/:id", auth, async (req, res) => {
    const ShowId = req.params.id;
    const updates = req.body;

    const show = await Show.findOne({
        ShowId,
    }).select({
        Name: 1,
        UserId: 1,
    });

    if (show.UserId != req.user.UserId) return res.sendStatus(403);

    await Object.keys(updates).forEach((key) => (show[key] = updates[key]));

    show.save();

    res.sendStatus(200);
});

_show.get("/subscribers/count/:id", auth, async (req, res) => {
    const ShowId = req.params.id;
    const { Followers: followers } = await Show.findOne({
        ChannelId,
    }).select({
        Followers: 1,
    });
    const count = followers.length;
    res.send(count.toString());
});

function paginator(items, page, per_page) {
    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems,
    };
}

module.exports = _show;