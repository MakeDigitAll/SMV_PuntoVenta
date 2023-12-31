PGDMP     6    $                {            SMV_DEV    14.8    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    28912    SMV_DEV    DATABASE     }   CREATE DATABASE "SMV_DEV" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE "SMV_DEV";
                postgres    false            �           1259    31010    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "perfilSeguridadId" integer,
    "vendedorId" integer,
    "isDeleted" boolean DEFAULT false,
    "isUpdated" boolean DEFAULT false,
    "creationDate" date,
    "updatedDate" date,
    "isActive" boolean DEFAULT true,
    "accessToken" text,
    image bytea
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �           1259    31018    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    498            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    499            d           2604    31019    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    499    498            �          0    31010    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, nombre, apellido, email, password, "perfilSeguridadId", "vendedorId", "isDeleted", "isUpdated", "creationDate", "updatedDate", "isActive", "accessToken", image) FROM stdin;
    public          postgres    false    498   7       �           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 42, true);
          public          postgres    false    499            i           2606    31021    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    498            �   �   x���͎�0E��9�Z���,q���S&Q����~0�Ӌ1&.ͽ�9�����ɡ��(hc:�O�V�V`�tFY.���̑K��{.S܋`�B+36��l�,�g�L«��uS���:�A~����O�h��U]�Gh��yEx�hU7i,Ц,Ajat��'v�o����b�͓~�i��q��J&�_v*�<��텝��To?�c�qn:�W|     