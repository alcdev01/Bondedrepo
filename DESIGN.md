---
name: UNBonded Evidence Hub
description: A source-led research atlas for navigating evidence on bonded labour in Nepal.
colors:
  night: "#081a2b"
  navy: "#102d4a"
  aqua: "#1687a7"
  mint: "#dcece7"
  sun: "#ffca5b"
  coral: "#fa7859"
  paper: "#fffdf8"
  muted: "#57717a"
  kamaiya: "#f0b24c"
  haliya: "#8068c5"
  haruwa: "#36a89f"
typography:
  display:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(3.2rem, 6vw, 5.8rem)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  field: "4px"
  action: "8px"
  surface: "18px"
spacing:
  field: "11px"
  compact: "18px"
  component: "28px"
  section: "78px"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.night}"
    rounded: "{rounded.action}"
    padding: "0 20px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.surface}"
    padding: "28px"
  field:
    backgroundColor: "#fff"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "{spacing.field}"
---

# Design System: UNBonded Evidence Hub

## Overview

**Creative North Star: "The Research Atlas"**

The interface treats evidence as a navigable landscape: each source is a location with a visible method, geography, and limitation, not a detached citation. Deep navy gives the product its institutional backbone; warm paper, documentary photography, and lifted record surfaces make long-form research feel approachable rather than bureaucratic.

The system is editorial and operational at once. Large serif headlines establish the human stakes, while compact mono labels turn filters, systems, and metadata into legible wayfinding. The experience should remain calm, highly scannable, and grounded in the actual record.

**Key Characteristics:**

- Documentary, source-led, and geographically aware.
- Warm archive surfaces against a deep civic-navy frame.
- Editorial hierarchy paired with compact research metadata.
- Soft, ambient elevation that separates evidence without making it feel decorative.

## Colors

The palette balances a deep institutional foundation with warm archival paper and a small set of meaningful signals for discovery, systems, and action.

### Primary

- **Atlas Navy:** primary framing color for navigation, headings, dark sections, and body ink.
- **Survey Aqua:** discovery and interaction accent for linked evidence, borders, and map-oriented signals.

### Secondary

- **Fieldwork Coral:** warm emphasis for source authors, metrics, and primary calls to action.
- **Signal Sun:** sparing highlight for active navigation, hero emphasis, and search actions.

### Tertiary

- **Kamaiya Gold, Haliya Violet, and Haruwa Teal:** coded map and system colors. Preserve these distinctions wherever geographic/system overlap must be read quickly.

### Neutral

- **Archive Paper:** primary card and document surface.
- **Mint Ground:** quiet page background and tonal section separator.
- **Quiet Slate:** secondary explanatory text and form labels.

**The Evidence-Signal Rule.** Use the bright accents to guide attention or encode research meaning; do not turn them into generic decoration.

## Typography

**Display Font:** Libre Baskerville (with Georgia fallback)
**Body Font:** Manrope (with Arial fallback)
**Label/Mono Font:** DM Mono (with monospace fallback)

**Character:** Serif display type carries gravity and reflection; Manrope keeps research prose clear at reading size; mono labels give evidence categories a restrained, cataloguing voice.

### Hierarchy

- **Display:** used for hero statements and major route titles.
- **Headline:** used for section framing and source-card titles.
- **Body:** 16px/1.55 for descriptive copy and findings; keep reading measures controlled by the existing shell and content maxima.
- **Label:** uppercase, 800-weight mono labels with expanded tracking for metadata, filters, chips, and eyebrows.

**The Two-Speed Rule.** Let editorial serif type carry ideas; let mono labels carry classification. Do not use mono for long-form prose.

## Layout

The 1180px shell is the atlas frame, with 28px side gutters. Sections use a generous 78px vertical cadence, paired with 18px component gaps. Editorial section heads split into two columns; catalogue records stay in a single readable column; cards, methodology items, and contacts use responsive grids. At 800px and below, grids progressively collapse and hero type tightens to preserve scanability.

## Elevation & Depth

Depth is ambient and approachable. Paper cards lift from mint and pale surfaces with diffuse navy-tinted shadows; dark image heroes use gradients to protect text instead of extra chrome. Hover motion is short and restrained, typically a small upward shift paired with a softening or deepening shadow.

### Shadow Vocabulary

- **Record Lift:** `0 14px 35px #102d4a18` for source cards, feature cards, and detail surfaces.
- **Media Lift:** `0 15px 30px #08233b1c` for documentary cards, increasing modestly on hover.

**The Grounded Surface Rule.** A card may lift to establish a record boundary, but the page itself should remain calm and flat.

## Shapes

The system uses gently rounded, practical geometry: 18px for primary surfaces, 8px for actions, and 4px for conventional fields. Navigation’s UN mark and map markers use circles deliberately; cards do not. Borders are quiet mint/slate lines or a single colored left/top edge when a record needs categorical emphasis.

## Components

### Buttons

- **Shape:** compact rounded actions (8px).
- **Primary:** sun-filled search action with dark navy text.
- **Hover / Focus:** preserve clear contrast and use a modest color or lift transition; source CTAs shift from coral to navy.

### Chips

- **Style:** uppercase mono labels used to show systems and themes in a compact research vocabulary.
- **State:** variants use coral, sage/mint, and gold/sun only to clarify meaning or workflow stage.

### Cards / Containers

- **Corner Style:** broad, gentle surfaces (18px; selected supporting cards also use 14–16px).
- **Background:** archive paper over mint/white page grounds.
- **Shadow Strategy:** soft navy ambient lift, never hard outlines.
- **Internal Padding:** commonly 26–30px; full source cards may extend to 42px.

### Inputs / Fields

- **Style:** white fields with a soft mint-gray border and 4px radius.
- **Focus:** maintain a visible, high-contrast focus treatment when extending the system.

### Navigation

- **Style:** sticky 74px Atlas Navy bar with white links, a sun circular UN marker, and Signal Sun active/hover state.
- **Mobile treatment:** compact toggle replaces the horizontal link group.

### Source Cards

- **Style:** large serif-linked titles, compact mono author/category line, scope metadata, recorded claim, and chips.
- **Signature treatment:** catalogue cards gain a Survey Aqua left rule to make scan order clear.

## Do's and Don'ts

### Do:

- **Do** preserve metadata beside evidence claims so sources remain interpretable at a glance.
- **Do** use documentary imagery behind dark, readable gradient overlays for major route entry points.
- **Do** reserve Signal Sun and Fieldwork Coral for meaningful emphasis, selection, or action.
- **Do** maintain the atlas rhythm: generous sections, focused content columns, and restrained card grids.

### Don't:

- **Don't** flatten source records into anonymous tiles or remove method/geography context for visual simplicity.
- **Don't** introduce neon accents, glossy gradients, or dense dashboard chrome that competes with the evidence.
- **Don't** use typography or color to imply certainty beyond what the record supports.
