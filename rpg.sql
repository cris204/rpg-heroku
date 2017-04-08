--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "character" (
    character_id integer NOT NULL,
    character_name text NOT NULL,
    base_health integer NOT NULL,
    base_attack integer NOT NULL,
    base_defense integer NOT NULL,
    base_sp_attack integer NOT NULL,
    base_sp_defense integer NOT NULL,
    element text NOT NULL
);


ALTER TABLE "character" OWNER TO postgres;

--
-- Name: leaderboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE leaderboard (
    player_id integer NOT NULL,
    score integer NOT NULL
);


ALTER TABLE leaderboard OWNER TO postgres;

--
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE player (
    player_id integer NOT NULL,
    player_name text NOT NULL
);


ALTER TABLE player OWNER TO postgres;

--
-- Name: playercharacter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE playercharacter (
    player_id integer NOT NULL,
    character_id integer NOT NULL,
    health_points integer NOT NULL,
    attack_points integer NOT NULL,
    defense_points integer NOT NULL,
    sp_attack_points integer NOT NULL,
    sp_defense_points integer NOT NULL
);


ALTER TABLE playercharacter OWNER TO postgres;

--
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE team (
    player_id integer NOT NULL,
    character_id_1 integer,
    character_id_2 integer,
    character_id_3 integer
);


ALTER TABLE team OWNER TO postgres;

--
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "character" VALUES (1, 'Grougal', 200, 25, 25, 50, 50, 'Fire Warrior');
INSERT INTO "character" VALUES (2, 'Samantha', 200, 25, 25, 50, 50, 'Grass archer');
INSERT INTO "character" VALUES (3, 'Nefarian', 200, 25, 25, 50, 50, 'water necromancer');
INSERT INTO "character" VALUES (4, 'nerffeadin', 200, 30, 25, 50, 50, 'witcher');
INSERT INTO "character" VALUES (5, 'jaramiyolo', 200, 345, 25, 50, 50, 'neutral');


--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO leaderboard VALUES (11, 240);
INSERT INTO leaderboard VALUES (10, 360);


--
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO player VALUES (10, 'cristian');
INSERT INTO player VALUES (11, 'hoyos');


--
-- Data for Name: playercharacter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO playercharacter VALUES (10, 3, 200, 25, 25, 50, 50);
INSERT INTO playercharacter VALUES (10, 1, 200, 45, 25, 50, 50);
INSERT INTO playercharacter VALUES (11, 1, 200, 25, 25, 50, 50);
INSERT INTO playercharacter VALUES (11, 2, 200, 25, 25, 50, 50);
INSERT INTO playercharacter VALUES (11, 3, 200, 25, 25, 50, 50);
INSERT INTO playercharacter VALUES (10, 2, 226, 25, 25, 50, 50);


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO team VALUES (11, 2, 3, 1);
INSERT INTO team VALUES (10, 4, 2, 3);


--
-- Name: character Character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY (character_id);


--
-- Name: leaderboard Leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY leaderboard
    ADD CONSTRAINT "Leaderboard_pkey" PRIMARY KEY (player_id);


--
-- Name: leaderboard Leaderboard_player_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY leaderboard
    ADD CONSTRAINT "Leaderboard_player_id_key" UNIQUE (player_id);


--
-- Name: playercharacter PlayerCharacter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY playercharacter
    ADD CONSTRAINT "PlayerCharacter_pkey" PRIMARY KEY (player_id, character_id);


--
-- Name: player Player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY player
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY (player_id);


--
-- Name: player Player_player_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY player
    ADD CONSTRAINT "Player_player_id_key" UNIQUE (player_id);


--
-- Name: team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY team
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (player_id);


--
-- Name: team team_player_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY team
    ADD CONSTRAINT team_player_id_key UNIQUE (player_id);


--
-- Name: index_attack_points; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_attack_points ON playercharacter USING btree (attack_points);


--
-- Name: index_base_attack; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_base_attack ON "character" USING btree (base_attack);


--
-- Name: index_base_defense; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_base_defense ON "character" USING btree (base_defense);


--
-- Name: index_base_health; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_base_health ON "character" USING btree (base_health);


--
-- Name: index_base_sp_attack; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_base_sp_attack ON "character" USING btree (base_sp_attack);


--
-- Name: index_base_sp_defense; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_base_sp_defense ON "character" USING btree (base_sp_defense);


--
-- Name: playercharacter lnk_Character_PlayerCharacter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY playercharacter
    ADD CONSTRAINT "lnk_Character_PlayerCharacter" FOREIGN KEY (character_id) REFERENCES "character"(character_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leaderboard lnk_Player_Leaderboard; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY leaderboard
    ADD CONSTRAINT "lnk_Player_Leaderboard" FOREIGN KEY (player_id) REFERENCES player(player_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team lnk_Player_Team; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY team
    ADD CONSTRAINT "lnk_Player_Team" FOREIGN KEY (player_id) REFERENCES player(player_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

