--
-- PostgreSQL database dump
--



-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-25 18:46:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16439)
-- Name: achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.achievements (
    id character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.achievements OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cases (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    category character varying(255),
    description text NOT NULL,
    image text NOT NULL,
    difficulty integer NOT NULL,
    steps jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cases OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cases_id_seq OWNER TO postgres;

--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 221
-- Name: cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cases_id_seq OWNED BY public.cases.id;


--
-- TOC entry 227 (class 1259 OID 16449)
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_achievements (
    id integer NOT NULL,
    user_id integer,
    achievement_id character varying(50),
    earned_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_achievements OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16448)
-- Name: user_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_achievements_id_seq OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_achievements_id_seq OWNED BY public.user_achievements.id;


--
-- TOC entry 224 (class 1259 OID 16417)
-- Name: user_cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cases (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    status character varying(50),
    accuracy integer,
    answers jsonb,
    completed_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_cases OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16416)
-- Name: user_cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_cases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_cases_id_seq OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_cases_id_seq OWNED BY public.user_cases.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'student'::character varying,
    avatar text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4776 (class 2604 OID 16408)
-- Name: cases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases ALTER COLUMN id SET DEFAULT nextval('public.cases_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 16452)
-- Name: user_achievements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements ALTER COLUMN id SET DEFAULT nextval('public.user_achievements_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 16420)
-- Name: user_cases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases ALTER COLUMN id SET DEFAULT nextval('public.user_cases_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 16393)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4955 (class 0 OID 16439)
-- Dependencies: 225
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.achievements (id, title, description) FROM stdin;
first_case	Первый кейс	Поздравляем с первым пройденным кейсом!
five_cases	5 кейсов	Пройдено 5 кейсов
ten_cases	10 кейсов	Пройдено 10 кейсов
high_accuracy	Точность 100%	Кейс пройден с идеальной точностью
\.


--
-- TOC entry 4952 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases (id, title, category, description, image, difficulty, steps, created_at) FROM stdin;
2	Боль в спине	Экстренная медицина	Реальная проблема или веская причина взять больничный?	https://avatars.mds.yandex.net/i?id=fe36fe327ffdb387d44d52cc81e3f8df_l-8439682-images-thumbs&n=13	1	[{"id": 1, "type": "question", "options": [{"text": "Назначить МРТ", "correct": false}, {"text": "Провести осмотр и собрать анамнез", "correct": true}, {"text": "Выписать анальгетики и отпустить домой", "correct": false}], "question": "Пациент жалуется на боль в пояснице после подъема тяжестей. Что вы сделаете в первую очередь?", "explanation": "Сначала необходимо провести клинический осмотр и собрать анамнез."}, {"id": 2, "type": "info", "content": "После осмотра вы выявили симптомы радикулита. Пациент испытывает ограничение подвижности."}, {"id": 3, "type": "question", "options": [{"text": "Рентген позвоночника", "correct": true}, {"text": "КТ головы", "correct": false}, {"text": "Анализ крови на сахар", "correct": false}], "question": "Какое исследование наиболее уместно на этом этапе?", "explanation": "Рентген может показать дегенеративные изменения или травму."}, {"id": 4, "type": "info", "content": "Рентген показал наличие остеохондроза поясничного отдела."}, {"id": 5, "type": "question", "options": [{"text": "Оперативное вмешательство", "correct": false}, {"text": "Консервативное лечение: НПВС, ЛФК", "correct": true}, {"text": "Иглоукалывание", "correct": false}], "question": "Какое лечение вы предложите в первую очередь?", "explanation": "На начальном этапе показано консервативное лечение."}]	2026-04-17 15:26:54.300097
1	Психотический эпизод у подростка	Психиатрия	16-летний парень привезён в психиатрическую клинику с галлюцинациями.	https://img.freepik.com/premium-vector/illustration-depressed-boy-abused-by-friends-emotional-concept_1323048-72967.jpg?semt=ais_hybrid	5	[{"id": 1, "type": "question", "options": [{"text": "Наличие суицидальных мыслей", "correct": true}, {"text": "Наличие зубной боли", "correct": false}, {"text": "Наличие сыпи на коже", "correct": false}], "question": "Первичная оценка состояния: что важно уточнить?", "explanation": "Безопасность пациента и риск суицида в приоритете."}, {"id": 2, "type": "info", "content": "Пациент отрицает суицидальные намерения, но агрессивен."}, {"id": 3, "type": "question", "options": [{"text": "Рисперидон перорально", "correct": false}, {"text": "Лоразепам внутривенно", "correct": true}, {"text": "Циталопрам перорально", "correct": false}], "question": "Какие препараты назначить для седации?", "explanation": "Бензодиазепин быстро успокоит пациента."}, {"id": 4, "type": "info", "content": "Пациент успокоился через 30 минут."}, {"id": 5, "type": "question", "options": [{"text": "Приём психотропных препаратов", "correct": true}, {"text": "Любимые хобби", "correct": false}, {"text": "Последние оценки в школе", "correct": false}], "question": "Что важнее всего при сборе анамнеза?", "explanation": "Лекарственная история поможет исключить абстинентный синдром."}, {"id": 6, "type": "info", "content": "Выяснено, что неделю назад пациент бросил принимать сертралин."}, {"id": 7, "type": "question", "options": [{"text": "Возобновить сертралин", "correct": false}, {"text": "Постепенно снизить дозу и переключить на другой СИОЗС", "correct": true}, {"text": "Немедленно провести ЭЭГ", "correct": false}], "question": "Ваш следующий шаг?", "explanation": "Плавная смена СИОЗС минимизирует риск рецидива."}, {"id": 8, "type": "info", "content": "Через 3 дня пациент стал менее агрессивным, смена терапии прошла без осложнений."}]	2026-04-17 15:20:24.966868
4	Одышка у пожилых	Кардиология	Что делать, если ваш 74-летний пациент не может нормально дышать?	https://avatars.mds.yandex.net/i?id=7fae75c6a3748a7965995531546b3cb4_l-5227767-images-thumbs&n=13	3	[{"id": 1, "type": "question", "options": [{"text": "Хроническая сердечная недостаточность", "correct": true}, {"text": "Гастрит", "correct": false}, {"text": "Невралгия", "correct": false}], "question": "У пациента одышка в покое. Что вы заподозрите?", "explanation": "ХСН — частая причина одышки у пожилых."}, {"id": 2, "type": "question", "options": [{"text": "ЭКГ и ЭхоКГ", "correct": true}, {"text": "МРТ головного мозга", "correct": false}, {"text": "Анализ мочи", "correct": false}], "question": "Какое исследование подтвердит диагноз?", "explanation": "ЭхоКГ покажет снижение ФВ и дилатацию камер сердца."}, {"id": 3, "type": "info", "content": "ЭхоКГ выявило ФВ 35%, дилатация ЛЖ. Диагноз подтверждён."}, {"id": 4, "type": "question", "options": [{"text": "Ингибиторы АПФ, бета-блокаторы, диуретики", "correct": true}, {"text": "Антибиотики", "correct": false}, {"text": "Аспирин и омега-3", "correct": false}], "question": "Что входит в базовую терапию ХСН?", "explanation": "Это стандартное лечение ХСН с пониженной ФВ."}]	2026-04-17 15:26:54.300097
5	Сильная боль в животе	Хирургия	Острый живот у молодого человека. Экстренная помощь или нет?	https://avatars.mds.yandex.net/i?id=f9ac045cd46a271e89af30f5999e4bfa_l-5204918-images-thumbs&n=13	2	[{"id": 1, "type": "question", "options": [{"text": "Аппендицит", "correct": true}, {"text": "Холецистит", "correct": false}, {"text": "Панкреатит", "correct": false}], "question": "Сильная боль в правом нижнем квадранте. Что подозреваете?", "explanation": "Типичная локализация при аппендиците."}, {"id": 2, "type": "info", "content": "У пациента температура 38.3°C, болезненность при пальпации, симптом Щёткина-Блюмберга."}, {"id": 3, "type": "question", "options": [{"text": "УЗИ брюшной полости", "correct": true}, {"text": "ФГДС", "correct": false}, {"text": "Рентген грудной клетки", "correct": false}], "question": "Следующее диагностическое действие?", "explanation": "УЗИ помогает визуализировать воспалённый аппендикс."}, {"id": 4, "type": "question", "options": [{"text": "Госпитализация и подготовка к операции", "correct": true}, {"text": "Домашнее наблюдение", "correct": false}, {"text": "Обезболивание и выписка", "correct": false}], "question": "Следующее действие?", "explanation": "Аппендицит требует хирургического вмешательства."}]	2026-04-17 15:26:54.300097
7	Постоянная лихорадка у ребенка	Педиатрия	Лихорадка в течение 6 дней, сыпь, красные губы — что происходит?	https://avatars.mds.yandex.net/i?id=d78344cf1ee891c091d7b7738a57bf0c5ab1b9ed-8710632-images-thumbs&n=13	3	[{"id": 1, "type": "question", "options": [{"text": "Синдром Кавасаки", "correct": true}, {"text": "ОРВИ", "correct": false}, {"text": "Аллергия", "correct": false}], "question": "Какой синдром наиболее вероятен?", "explanation": "Классическая триада: лихорадка, сыпь, слизистые."}, {"id": 2, "type": "info", "content": "Также наблюдаются шелушение пальцев и лимфаденопатия."}, {"id": 3, "type": "question", "options": [{"text": "Иммуноглобулины и аспирин", "correct": true}, {"text": "Антибиотики", "correct": false}, {"text": "Гормоны", "correct": false}], "question": "Лечение Кавасаки включает:", "explanation": "IVIG и аспирин — стандарт лечения."}]	2026-04-17 15:26:54.300097
3	Полидипсия у подростка	Эндокринология	Чрезмерная жажда у 15-летнего мальчика: что может быть не так?	https://cdn2.fptshop.com.vn/unsafe/800x0/trai_nghia_voi_khat_la_gi_8_593796d194.jpg	2	[{"id": 1, "type": "question", "options": [{"text": "Сахарный диабет", "correct": true}, {"text": "Артериальная гипертензия", "correct": false}, {"text": "ОРВИ", "correct": false}], "question": "Что может быть причиной жажды у подростка?", "explanation": "Полидипсия — частый симптом диабета 1 типа."}, {"id": 2, "type": "question", "options": [{"text": "Общий анализ крови", "correct": false}, {"text": "Уровень глюкозы в крови", "correct": true}, {"text": "ЭКГ", "correct": false}], "question": "Какое обследование назначите в первую очередь?", "explanation": "Измерение сахара крови — базовый тест при подозрении на диабет."}, {"id": 3, "type": "info", "content": "Глюкоза натощак — 14 ммоль/л. Подтверждён диагноз СД 1 типа."}, {"id": 4, "type": "question", "options": [{"text": "Инсулинотерапия", "correct": true}, {"text": "Диета без сахара", "correct": false}, {"text": "Глюкокортикоиды", "correct": false}], "question": "Какое лечение необходимо начать немедленно?", "explanation": "Инсулин — основа лечения СД 1 типа."}]	2026-04-17 15:26:54.300097
8	Сепсис после операции	Инфекционные болезни	Пациент через 3 дня после аппендэктомии поступил с лихорадкой и гипотонией.	https://avatars.mds.yandex.net/i?id=423629c4ad14a7556abf3b52afe5f0c88a46127d-16347695-images-thumbs&n=13	4	[{"id": 1, "type": "question", "options": [{"text": "Общий анализ крови и лактат", "correct": true}, {"text": "ЭКГ", "correct": false}, {"text": "КТ тазобедренных суставов", "correct": false}], "question": "Какие первые обследования назначите?", "explanation": "Сепсис подтверждается лейкоцитозом и повышенным лактатом."}, {"id": 2, "type": "info", "content": "Лейкоциты 18×10⁹/л, лактат — 4 ммоль/л."}, {"id": 3, "type": "question", "options": [{"text": "Цефтриаксон + метронидазол", "correct": true}, {"text": "Амикацин", "correct": false}, {"text": "Клиндамицин", "correct": false}], "question": "Какой антибактериальный препарат начнёте?", "explanation": "Широкий спектр: покрыть грам- и анаэробы."}, {"id": 4, "type": "info", "content": "После старта антибактериальной терапии давление стабилизировалось."}, {"id": 5, "type": "question", "options": [{"text": "Коллоидные растворы + кристаллоиды", "correct": true}, {"text": "Только кристаллоиды", "correct": false}, {"text": "Только коллоиды", "correct": false}], "question": "Что делать с инфузионной терапией?", "explanation": "Комбинированная инфузия улучшает гемодинамику."}, {"id": 6, "type": "info", "content": "Потребление кислорода стабильно, диурез 0.5 мл/кг/ч."}, {"id": 7, "type": "question", "options": [{"text": "Через 48 часов после старта АБТ", "correct": true}, {"text": "Через 24 часа", "correct": false}, {"text": "Не требуется", "correct": false}], "question": "Когда выполняете контрольные культуры?", "explanation": "Контроль через 48 часов оценит эффективность терапии."}, {"id": 8, "type": "info", "content": "Культуры крови стерильны, состояние пациента улучшилось."}]	2026-04-17 15:26:54.300097
6	Травма головы после падения	Неврология	Пожилой пациент, падает дома, развивается спутанность сознания	https://avatars.mds.yandex.net/i?id=8b8deb39d33feafe0e68a02b3df6ad5815d7064b-2352943-images-thumbs&n=13	2	[{"id": 1, "type": "question", "options": [{"text": "Срочная КТ головы", "correct": true}, {"text": "Рентген таза", "correct": false}, {"text": "Анализ крови", "correct": false}], "question": "Что делать при подозрении на ЧМТ?", "explanation": "КТ головы — золотой стандарт диагностики при ЧМТ."}, {"id": 2, "type": "info", "content": "КТ показывает субдуральную гематому."}, {"id": 3, "type": "question", "options": [{"text": "Консультация нейрохирурга", "correct": true}, {"text": "УЗИ сердца", "correct": false}, {"text": "Назначить парацетамол", "correct": false}], "question": "Что делать при обнаружении гематомы?", "explanation": "Требуется срочное решение о вмешательстве."}]	2026-04-17 15:26:54.300097
\.


--
-- TOC entry 4957 (class 0 OID 16449)
-- Dependencies: 227
-- Data for Name: user_achievements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_achievements (id, user_id, achievement_id, earned_at) FROM stdin;
1	1	first_case	2026-04-17 15:54:11.57268
2	1	high_accuracy	2026-04-17 15:54:11.57268
\.


--
-- TOC entry 4954 (class 0 OID 16417)
-- Dependencies: 224
-- Data for Name: user_cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cases (id, user_id, case_id, status, accuracy, answers, completed_at) FROM stdin;
17	1	5	failed	33	[{"stepId": 1, "question": "Сильная боль в правом нижнем квадранте. Что подозреваете?", "isCorrect": false, "selectedOption": "Панкреатит"}, {"stepId": 3, "question": "Следующее диагностическое действие?", "isCorrect": false, "selectedOption": "ФГДС"}, {"stepId": 4, "question": "Следующее действие?", "isCorrect": true, "selectedOption": "Госпитализация и подготовка к операции"}]	2026-04-17 17:08:20.960587
8	1	4	success	100	[{"stepId": 1, "question": "У пациента одышка в покое. Что вы заподозрите?", "isCorrect": true, "selectedOption": "Хроническая сердечная недостаточность"}, {"stepId": 2, "question": "Какое исследование подтвердит диагноз?", "isCorrect": true, "selectedOption": "ЭКГ и ЭхоКГ"}, {"stepId": 4, "question": "Что входит в базовую терапию ХСН?", "isCorrect": true, "selectedOption": "Ингибиторы АПФ, бета-блокаторы, диуретики"}]	2026-04-17 17:16:42.127346
10	1	8	failed	0	[]	2026-04-17 17:17:13.377144
1	1	1	failed	75	[{"stepId": 1, "question": "Первичная оценка состояния: что важно уточнить?", "isCorrect": false, "selectedOption": "Наличие сыпи на коже"}, {"stepId": 3, "question": "Какие препараты назначить для седации?", "isCorrect": true, "selectedOption": "Лоразепам внутривенно"}, {"stepId": 5, "question": "Что важнее всего при сборе анамнеза?", "isCorrect": true, "selectedOption": "Приём психотропных препаратов"}, {"stepId": 7, "question": "Ваш следующий шаг?", "isCorrect": true, "selectedOption": "Постепенно снизить дозу и переключить на другой СИОЗС"}]	2026-04-17 16:49:00.431136
14	1	7	failed	0	[{"stepId": 1, "question": "Какой синдром наиболее вероятен?", "isCorrect": false, "selectedOption": "Аллергия"}, {"stepId": 3, "question": "Лечение Кавасаки включает:", "isCorrect": false, "selectedOption": "Гормоны"}]	2026-04-17 17:07:53.236333
15	1	6	failed	0	[{"stepId": 1, "question": "Что делать при подозрении на ЧМТ?", "isCorrect": false, "selectedOption": "Анализ крови"}, {"stepId": 3, "question": "Что делать при обнаружении гематомы?", "isCorrect": false, "selectedOption": "УЗИ сердца"}]	2026-04-17 17:08:03.782086
16	1	3	failed	0	[{"stepId": 1, "question": "Что может быть причиной жажды у подростка?", "isCorrect": false, "selectedOption": "ОРВИ"}, {"stepId": 2, "question": "Какое обследование назначите в первую очередь?", "isCorrect": false, "selectedOption": "ЭКГ"}, {"stepId": 4, "question": "Какое лечение необходимо начать немедленно?", "isCorrect": false, "selectedOption": "Глюкокортикоиды"}]	2026-04-17 17:08:12.153971
4	1	2	failed	0	[]	2026-04-17 17:09:59.155603
\.


--
-- TOC entry 4950 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, avatar) FROM stdin;
2	Greni	vova.sazan2018@yandex.ru	$2b$10$k8DDBW73qBmWLL6iJ5r.seZL05C53p0ZTHEAQ/8/g7XjOZgQpS/GO	student	\N
1	admin	vova.sazan2017@yandex.ru	$2b$10$amK6StMoadIrrmGTnMj7s.KtzI.XuaZwIYS0hyOhjtjvNRd2LaYsu	admin	\N
\.


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 221
-- Name: cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_id_seq', 10, true);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_achievements_id_seq', 2, true);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cases_id_seq', 23, true);


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- TOC entry 4793 (class 2606 OID 16447)
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16415)
-- Name: cases cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);


--
-- TOC entry 4795 (class 2606 OID 16456)
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- TOC entry 4797 (class 2606 OID 16458)
-- Name: user_achievements user_achievements_user_id_achievement_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_achievement_id_key UNIQUE (user_id, achievement_id);


--
-- TOC entry 4789 (class 2606 OID 16426)
-- Name: user_cases user_cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_pkey PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 16428)
-- Name: user_cases user_cases_user_id_case_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_user_id_case_id_key UNIQUE (user_id, case_id);


--
-- TOC entry 4783 (class 2606 OID 16403)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4785 (class 2606 OID 16401)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4800 (class 2606 OID 16464)
-- Name: user_achievements user_achievements_achievement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievements(id);


--
-- TOC entry 4801 (class 2606 OID 16459)
-- Name: user_achievements user_achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4798 (class 2606 OID 16434)
-- Name: user_cases user_cases_case_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_case_id_fkey FOREIGN KEY (case_id) REFERENCES public.cases(id);


--
-- TOC entry 4799 (class 2606 OID 16429)
-- Name: user_cases user_cases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-04-25 18:46:37

--
-- PostgreSQL database dump complete
--


