from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Decision(Base):

    __tablename__ = "decisions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    query = Column(Text)

    verdict = Column(Text)

    confidence = Column(Integer)

    reasoning = Column(Text)