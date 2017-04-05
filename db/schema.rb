# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170404054828) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "eats", force: :cascade do |t|
    t.float    "longitude",  null: false
    t.float    "latitude",   null: false
    t.string   "title",      null: false
    t.string   "image"
    t.text     "info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.float    "longitude",  null: false
    t.float    "latitude",   null: false
    t.string   "title",      null: false
    t.date     "date",       null: false
    t.string   "image"
    t.text     "info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", force: :cascade do |t|
    t.integer  "user_id"
    t.float    "longitude",      null: false
    t.float    "latitude",       null: false
    t.date     "arrival_date",   null: false
    t.date     "departure_date", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["user_id"], name: "index_plans_on_user_id", using: :btree
  end

  create_table "saved_eats", force: :cascade do |t|
    t.integer  "eat_id"
    t.integer  "plan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["eat_id"], name: "index_saved_eats_on_eat_id", using: :btree
    t.index ["plan_id"], name: "index_saved_eats_on_plan_id", using: :btree
  end

  create_table "saved_events", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "plan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_saved_events_on_event_id", using: :btree
    t.index ["plan_id"], name: "index_saved_events_on_plan_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "full_name",       null: false
    t.string   "address_1",       null: false
    t.string   "address_2"
    t.string   "city",            null: false
    t.string   "state_code",      null: false
    t.string   "zip_code",        null: false
    t.string   "country_code",    null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "plans", "users"
  add_foreign_key "saved_eats", "eats"
  add_foreign_key "saved_eats", "plans"
  add_foreign_key "saved_events", "events"
  add_foreign_key "saved_events", "plans"
end
