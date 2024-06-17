# Runeapes Interview Task

## Position: Storybook / Design System Engineer (2.5k USD/m)

#### DEADLINE: 6/21/2024 
Applications after this time period will not be considered. As mentioned, we will go with the first person that is able to submit a PR that is able to complete the task

### Required Skills
- TypeScript (TS)
- Styled Components
- Experience with Design Systems
- Storybook
- React

### Task Overview

Your task is to create a React component library with a single component: the Carousel.

The component library should have a storybook that showcases the Carousel made.

#### Important: This carousel component needs to be built from scratch, you cannot use "carousel" libraries. Libraries for handling dragging on mobile are allowed, however

### Carousel Component Requirements

1. **Children and Width**:
   - The Carousel component should accept multiple children of the same width (cards).

2. **isInfinite Prop**:
   - `isInfinite` (boolean): Determines if the carousel is infinite.
   - If `isInfinite` is `true`, the carousel loops infinitely.
   - If `isInfinite` is `false`, the carousel scrolls only through the available cards.

   **Example**: Check our website [Runeapes](https://runeapes.io) at the section "Tools even chimps could use" for an example of an infinite carousel (not draggable)

3. **Interaction**:
   - **Mobile**: The carousel you create SHOULD be draggable. The scroll speed should reflect the drag speed:
     - Slow drag: scrolls fewer cards.
     - Fast drag: scrolls more cards.
   - **Desktop**: The carousel should use buttons for navigation.

### Final Steps

1. **Component Library**:
   - Create a component library for the Carousel.
   - Use a tool like Rollup to prepare it for upload to npm.
   - Ensure to export both the Carousel component and its types.
   - Upload to npm and create a repo with the source code

2. **Submission**:
   - Submit a pull request (PR) with the npm package name.
   - In the same PR, include a link to the repo with the source code for the component library with the carousel.
   - If you are applying from Discord, send the PR link to @mork1e on Discord.

### Good Luck!
