# Network Watch: a concept for traffic operators

A one-day design concept: what a traffic operator's "what needs me now?" screen could look like, built on the data model of Queensland's public traffic feed (QLDTraffic API v1.10). Made for the Transmax Product Designer application.

**Not STREAMS, and not affiliated with Transport and Main Roads or Transmax.** Every design decision is a hypothesis to test with operators.

## The idea

The list sets the priority; the map gives the context. The queue decides what you look at next, and the map follows your selection.

- **Unplanned first:** crashes, hazards, flooding and congestion under "Needs attention"; roadworks and special events collapsed under "Planned".
- **Sorted by priority, then lane impact, then time.**
- **Never colour alone:** a stripe, a text label and list order all carry priority.
- **Stale data flagged:** unplanned events not updated in over an hour.
- **Keyboard first:** ↑ ↓ (or j k) move, Enter opens, Esc closes, / searches, F fits the map, ? opens the notes.
- **Dark by default** for dim control rooms (to check with operators).

Press **?** in the prototype for the full notes and the questions I'd ask operators.

## Data

`data/events.json` currently holds **illustrative events**: real Queensland roads, invented incidents, written in the QLDTraffic v2 event format (`scripts/illustrative.mjs`). The public API key in the QLDTraffic spec had used up its shared quota on 4 Nov 2026.

To switch to live data with a personal key from qldtraffic@tmr.qld.gov.au:

```bash
curl -s "https://api.qldtraffic.qld.gov.au/v2/events?apikey=YOUR_KEY" -o data/events-raw.json
node scripts/slim.mjs data/events-raw.json data/events.json
```

The page then labels itself as a live snapshot and credits the data: State of Queensland (Department of Transport and Main Roads) QLDtraffic API, CC BY 4.0 AU.

## Run

```bash
python3 -m http.server 8781
```

Then open http://localhost:8781. Base map: CARTO Dark Matter, © OpenStreetMap contributors © CARTO. Map library: MapLibre GL JS 4.7.1.
