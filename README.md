# Zigital
A digital logic simulator.

## About
Zigital aims to do primitive digital logic simulation via vanilla JavaScript with HTML5 canvas.
React is used as a UI to user settings and pallette selections. The POSTGRES db and backend api
is implemented via Flask/SQLAlchemy.
Zigital is currently under development, I hope to one day successfully implement a finite state
machine but at the moment we will have to settle for simple combinational logic.

## Known bugs
- Currently deletion of wires is done in one foul swoop, a proximity deletion to a wire needs to be
implemented post haste to make quick modification of wires less taxing.
- Snap highlighting is missing on bulb and power components, this is a trivial fix.
- Snap highlighting on gate imputs is slightly dubious, this will need to be rectified in order
to facilitate a clean instantiation of connection objects. -- SOLVED
- Dead links are currently left on the page as a development goal reminder, these will be removed
before true deployment.
- Serialization of nested JSON objects in the database prove to be a non-trivial task. This is essential
for users to be able to save component abstractions and projects. Some more consideration needs to be made
as to how this can be accomplished with SQLAlchemy and Alembic. -- SOLVED

## Wishful thinking
- In the near future A* will be implemented as an alternative to manually routing wires, I
have actually already established the code base for this in a prior project (see my maze solving app)
but I need to do some more thinking on how to adapt the code cleanly. -- SOLVED
- The next step up from simple combinational logic would be to implement time-dependence in the form
of a simple clock.

## References
##### Color Theme
https://github.com/NLKNguyen/papercolor-theme
##### Python LCS implementation
http://openbookproject.net/courses/python4fun/logic.html
##### Using canvas in React
https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
#### John Winan's material is amazing
https://github.com/johnwinans
https://github.com/johnwinans/rvalp/releases
https://www.youtube.com/watch?v=em1zDi6q06o
#### JSON in SQLAlchemy best practices
https://amercader.net/blog/beware-of-json-fields-in-sqlalchemy/
#### Wikipedia references
https://en.wikipedia.org/wiki/Combinational_logic
#### FOSS svgs
https://www.svgrepo.com/svg/115674/profile
