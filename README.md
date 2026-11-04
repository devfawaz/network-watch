# Network Watch: a concept for traffic operators

A one-day design concept: what a traffic operator's "what needs me now?" screen could look like, built on the data model of Queensland's public traffic feed (QLDTraffic API v1.10). Made for the Transmax Product Designer application.

**Not STREAMS, and not affiliated with Transport and Main Roads or Transmax.** Every design decision is a hypothesis to test with operators.

## The problem

When a dozen things are happening on the network at once, an operator has to decide which one needs them now, and whether what they're seeing is current.

## Three guesses it tests

- **What needs me now:** unplanned events first, sorted by priority, then lanes blocked, then time; roadworks and special events collapsed under "Planned".
- **Can I trust it:** unplanned events not updated in over an hour are flagged.
- **List or map:** the list decides what you look at next; the map follows.

Also: priority never relies on colour alone; keyboard first (↑ ↓ or j k, Enter, Esc, /, F, ?); dark by default for dim control rooms (to check with operators).

Press **?** in the prototype for the full notes and the questions I'd ask operators. I've never seen an operator at work, so this is a way to start a conversation, not a fix.

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
