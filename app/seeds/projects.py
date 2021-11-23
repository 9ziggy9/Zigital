from app.models import db, Project

# Adds a demo user, you can add other users here if you want
def seed_projects():
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # ziggy = User(
    #     username='ziggy', email='ziggy@aa.io', password='password')
    # david = User(
    #     username='david', email='david@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(ziggy)
    # db.session.add(david)

    # db.session.commit()

    project1 = Project(user_id=1,
                       title='project1',
                       description='hello world 1',
                       state='{"hello":"world", "world":{"hello": "world"}}')
    db.session.add(project1);
    db.session.commit();


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
