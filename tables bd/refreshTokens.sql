PGDMP         &                {            SMV_DEV    14.8    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    28912    SMV_DEV    DATABASE     }   CREATE DATABASE "SMV_DEV" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE "SMV_DEV";
                postgres    false            �           1259    35279    refreshTokens    TABLE     Z   CREATE TABLE public."refreshTokens" (
    id integer NOT NULL,
    "refreshToken" text
);
 #   DROP TABLE public."refreshTokens";
       public         heap    postgres    false            �           1259    35282    refreshTokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public."refreshTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."refreshTokens_id_seq";
       public          postgres    false    500            �           0    0    refreshTokens_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."refreshTokens_id_seq" OWNED BY public."refreshTokens".id;
          public          postgres    false    501            d           2604    35283    refreshTokens id    DEFAULT     x   ALTER TABLE ONLY public."refreshTokens" ALTER COLUMN id SET DEFAULT nextval('public."refreshTokens_id_seq"'::regclass);
 A   ALTER TABLE public."refreshTokens" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    501    500            �          0    35279    refreshTokens 
   TABLE DATA           =   COPY public."refreshTokens" (id, "refreshToken") FROM stdin;
    public          postgres    false    500   �
       �           0    0    refreshTokens_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."refreshTokens_id_seq"', 212, true);
          public          postgres    false    501            f           2606    35290     refreshTokens refreshTokens_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."refreshTokens" DROP CONSTRAINT "refreshTokens_pkey";
       public            postgres    false    500            �      x������ � �     