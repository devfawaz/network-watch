// Turns a raw QLDTraffic v2 events response into the small file the prototype loads.
// Usage: node scripts/slim.mjs data/events-raw.json data/events.json
import { readFileSync, writeFileSync, statSync } from "node:fs";

const [, , inPath, outPath] = process.argv;
const raw = JSON.parse(readFileSync(inPath, "utf8"));
const features = raw.features || [];

// Every coordinate pair in a geometry, in order
function coords(g) {
  if (!g) return [];
  switch (g.type) {
    case "Point": return [g.coordinates];
    case "MultiPoint":
    case "LineString": return g.coordinates;
    case "MultiLineString":
    case "Polygon": return g.coordinates.flat();
    case "MultiPolygon": return g.coordinates.flat(2);
    case "GeometryCollection": return g.geometries.flatMap(coords);
    default: return [];
  }
}

// Line geometries only (the road segments affected), area alerts excluded
function lines(g, areaAlert) {
  if (!g) return [];
  const parts = g.type === "GeometryCollection" ? g.geometries.slice(0, areaAlert ? -1 : undefined) : [g];
  return parts.flatMap((p) =>
    p.type === "LineString" ? [p.coordinates] : p.type === "MultiLineString" ? p.coordinates : []
  );
}

const round = (c) => [Math.round(c[0] * 1e5) / 1e5, Math.round(c[1] * 1e5) / 1e5];

const events = features
  .map((f) => {
    const p = f.properties || {};
    const pts = coords(f.geometry);
    if (!pts.length) return null;
    const mid = pts[Math.floor(pts.length / 2)];
    return {
      id: p.id,
      status: p.status,
      type: p.event_type,
      subtype: p.event_subtype,
      dueTo: p.event_due_to,
      priority: p.event_priority,
      description: p.description,
      advice: p.advice,
      information: p.information,
      road: p.road_summary?.road_name,
      locality: p.road_summary?.locality,
      lga: p.road_summary?.local_government_area,
      district: p.road_summary?.district,
      impact: p.impact || null,
      start: p.duration?.start,
      end: p.duration?.end,
      published: p.published,
      updated: p.last_updated,
      nextInspection: p.next_inspection,
      source: p.source?.source_name,
      areaAlert: !!p.area_alert,
      alertMessage: p.alert_message || null,
      point: round(mid),
      lines: lines(f.geometry, p.area_alert).map((l) => l.map(round)),
    };
  })
  .filter(Boolean);

const out = {
  snapshot: statSync(inPath).mtime.toISOString(),
  illustrative: false,
  attribution:
    "State of Queensland (Department of Transport and Main Roads) QLDtraffic API, CC BY 4.0 AU",
  events,
};
writeFileSync(outPath, JSON.stringify(out));
console.log(`${events.length} events written to ${outPath}`);
