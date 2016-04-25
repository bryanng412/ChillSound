# ChillSound

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

ChillSound is a web application inspired by Soundcloud to listen and share chill music that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for a Soundcloud-inspired site: Docked music player, playlist creation and editing, song comments and likes, song/artist search, and song uploading
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

ChillSound will allow users to do the following:

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create and delete songs (MVP)
- [ ] Create, play, edit, and delete playlists (MVP)
- [ ] Like and leave comments on songs (MVP)
- [ ] Tag songs with multiple tags (expected feature, but not MVP)
- [ ] Search songs/artists/tags

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Song Model, API, and basic APIUtil (1.5 days)

**Objective:** Songs can be created, read, edited and destroyed through
the API.

- [ ] create `Song` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`SongsController`)
- [ ] jBuilder views for songs
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Songs can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `SongIndex`
  - [ ] `SongIndexItem`
  - [ ] `SongForm`
- [ ] save Songs to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Music Player (1 day)

**Objective** Build docked music player that will play and queue songs
- [ ] Dock player at bottom
- [ ] Continuously play music in queue

### Phase 5: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 6: Playlists (1 day)

**Objective:** Songs belong to Playlists, and can be viewed by playlist.

- [ ] create `Playlist` model
- build out API, Flux loop, and components for:
  - [ ] Playlist CRUD
  - [ ] adding songs requires a playlist
  - [ ] moving songs to a different playlist
  - [ ] viewing songs by playlist
- Use CSS to style new views

Phase 3 adds organization to the Songs. Songs belong to a Playlist,
which has its own `Index` view.

### Phase 7: Tags (1.5 days)

**Objective:** Songs can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for playlist
  - [ ] adding tags to playlist
  - [ ] creating tags while adding to playlists
  - [ ] searching playlists by tag
- [ ] Style new elements

### Phase 8: Search (0.5 days)

**objective:** Enable live searching of songs.

- [ ] Create Searchbar component
- [ ] Live search by song title, artist, or tag

### Phase 9 Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Infinite scroll for Songs/Playlist Index
- [ ] Changelogs for Songs
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
