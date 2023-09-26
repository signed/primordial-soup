Refactoring Golf
================

Refactoring Golf is a game designed to stretch your refactoring muscles and get you to explore your IDE to see what’s really possible using shortcuts and automation.

This repo contains multiple courses with a varying number of 'rounds', each equivalent to a 'hole' of a golf game.
Your goal is to (as safely and efficiently as possible) refactor the `round-n` code to look like the `round-n+1` code.
You must aim to do it in as few “strokes” as possible.
A stroke is essentially a change made to the code, and every stroke costs you points.

You should count your score as follows:

- 1 point for every change made to the code using a shortcut or automated IDE feature (e.g., automated refactoring, code template, or Find/Replace).
- 2 points for every manual edit. Note that a single “edit” could cover multiple lines of code, but will be in one file.
- Double points for every change made while the code is failing the tests from the previous change.
- Zero points for code formatting (e.g., deleting whitespace or optimizing imports).
- Allow yourselves two attempts at each round to determine your best score.
