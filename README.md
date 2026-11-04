# Network Watch

A small concept for traffic operators. I made it while applying for a product designer role at Transmax.

**Try it:** https://devfawaz.github.io/network-watch/

This is my own concept. It isn't STREAMS, and I'm not connected to Transmax or Transport and Main Roads. The incidents are made up; the roads are real.

## Why I made it

When I saw the role, my first thought was: I've never worked in transport.

So I read Transmax's [South Australia case study](https://transmax.com.au/wp-content/uploads/2025/06/SA-Streams-ITS-Platform_Case-Study_2025.pdf), where operators moved from 11 separate systems to one, with a single alarm manager and a map of every device. I kept picturing that one person at the desk when a dozen things go wrong at once.

What do they look at first, and can they trust it?

## My guesses

If I were sitting there, I think I'd want three things:

1. **Crashes and floods before roadworks.** Then sort by how serious it is, how many lanes are blocked, and how recent.
2. **Tell me when something's gone quiet.** If nobody has updated an incident in an hour, say so, so I don't act on old information.
3. **Pick from the list, the map follows.** I'm least sure about this one. Some operators might live on the map.

Smaller things: priority never relies on colour alone, everything works from the keyboard, and it's dark because control rooms are usually dim. I'd check all of it with operators.

## What I got wrong first

Once I actually used it, a few things were off:

- The dark map hid the roads, which is kind of the whole point. I made the main roads brighter.
- On a laptop the map got squashed into a thin strip, so the details now sit on top of it.
- On a phone the details covered everything. Now the list and details sit in a sheet you drag up or down.
- The markers didn't show up at first. My code was checking whether the map was ready at the wrong time.

## What I'd ask

- If you're rebuilding a tool operators already know by heart, how do you change it without slowing them down?
- What do you look at in the first minute of a motorway crash?
- How do you know someone else is already on it?
- Which alerts do you just ignore?

## What's not here

I know this is a narrow slice. It doesn't cover:

- **Acting on an incident:** acknowledging, assigning, changing signs or lanes.
- **Devices:** cameras, signs, signals and ramp meters, which are most of the real job.
- **Real scale:** 20 incidents, with no duplicates or device-fault noise.
- **More than one operator:** ownership, handover, wall screens versus desks.
- **Other directions:** I went with one layout and spent the time on questions instead.

I've never been in a control room, so I'm sure some of this is wrong. The closest real work I've done is [the failure states for a regulated share trade at Liquidise](https://www.fawaz.cc/work/unlocking-private-equity-for-shareholders).

## How to use it

- Press **?** for the short story behind it.
- **↑ ↓** move through incidents, **Enter** opens one, **Esc** closes, **/** searches, **F** fits the map.
- On a phone, drag the sheet up or down.

## About the data

The incidents in `data/events.json` are made up, written in the format of Queensland's public traffic feed ([QLDTraffic API spec v1.10](https://qldtraffic.qld.gov.au/more/Developers-and-Data/)). I checked every value against the spec. The public API key was out of quota when I built this, so I couldn't use live data.

With a personal key from TMR, live data can be swapped in:

```bash
curl -s "https://api.qldtraffic.qld.gov.au/v2/events?apikey=YOUR_KEY" -o data/events-raw.json
node scripts/slim.mjs data/events-raw.json data/events.json
```

The page then says it's a live snapshot and credits the data: State of Queensland (Department of Transport and Main Roads), QLDtraffic API, CC BY 4.0 AU.

## How it's built

One HTML file, no framework. The map is [MapLibre GL JS](https://maplibre.org/) on CARTO's dark base map. I designed it and worked out what it should do, built it with Claude Code, and tested it on keyboard, laptop and phone sizes.

To run it locally:

```bash
python3 -m http.server 8781
```

Then open http://localhost:8781.

Base map © OpenStreetMap contributors © CARTO.

Muhammed Fawaz · [fawaz.cc](https://www.fawaz.cc)
