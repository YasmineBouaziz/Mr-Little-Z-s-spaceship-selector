MAPPINGS = {
    "More than": ">",
    "Less than": "<",
    "Exactly": "==",
    "After": ">",
    "Before": "<",
    "On the exact date": "=",
    False: "NOT",
    True: "",
}


def add_colours_to_query(use_colours, query, colours):
    use_colours = MAPPINGS[use_colours]
    query += f"colour {use_colours} IN {*colours,})"
    return query


def construct_query(data):
    base_query = "SELECT * FROM spaceships WHERE ("
    base_query = (
        add_colours_to_query(
            use_colours=data["useTheseColours"],
            query=base_query,
            colours=data["colours"],
        )
        + " AND"
    )
    speed_type, speed_amount = MAPPINGS[data["speedType"]], data["speedAmount"]
    base_query += f" max_speed {speed_type} {speed_amount} AND"
    date_type, date, has_pulse_laser = (
        MAPPINGS[data["dateType"]],
        data["date"],
        MAPPINGS[data["hasPulseLaser"]],
    )
    base_query += f" date {date_type} {date} AND {has_pulse_laser} pulse_laser"
    return base_query
