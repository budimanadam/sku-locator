
CREATE TABLE if not exists public.item(
  item_id serial NOT null,
  item_name citext null,
  item_code citext null,
  stock int4 NOT NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (item_id)
);
   
CREATE table if not exists  public.bin(
  bin_id serial NOT null,
  bin_name citext null,
  bin_code citext null,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (bin_id)
);

CREATE TABLE IF NOT EXISTS public.bin_item_activity (
  bin_item_activity_id serial,
  bin_id int4 not null,
  item_id int4 not NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (bin_item_activity_id),
  FOREIGN KEY (item_id) REFERENCES public.item(item_id),
  FOREIGN KEY (bin_id) REFERENCES public.bin(bin_id)
);
      
CREATE TABLE IF NOT EXISTS public.user (
  user_id serial,
  user_code citext not null,
  email bytea NOT NULL,
  password character varying(255),
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
)
