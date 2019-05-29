# CompSoc Website

> University of Sheffield Computer Science Society Website

## Editing

### Committee Details

- Add new images to `src/images/committee/`
- Edit committee details in `routes/committee.js`
- Options for each committee member object:

```js
{
  name: string           // Your name
  role: string           // Committee role name - eg. secretary
  avatar: string         // Filename (without .jpg) of your avatar in src/images/committee. Set to `tbd` if no picture exists
  social?: {             // Social usernames (all optional)
    twitter?: string     // Twitter handle
    instagram?: string   // Instagram handle
    github?: string      // GitHub username
    facebook?: string    // Facebook username (in the URL on your profile page)
  }
  bio: string            // Brief description of you
}
```

### Event Database

- Events will be removed from the "upcoming" page after the specified date
- Add new events to `eventdb.js` (scroll down to find categorised listings)
- The options for each event item is as follows:

```js
{
  title: string   // Name of event
  url?: string    // Link to custom event page (optional)
  dom: number     // Day of month - (1 = 1st, 2 = 2nd, ...)
  moy: number     // Month of year - (1 = Jan, 2 = Feb, ..)
  year: number    // Year
  type: number    // Event category - eg. social, tutorial, etc
  link?: {        // Related links - eg. Facebook event / tickets (optional)
    text: string    // Text to show for related link
    url: string     // URL of related link
  }
}
```

## Running

### Development
- Run `npm start:dev` and `npm build:dev` in separate terminals simultaneously.

### Production
- Log into `compsoc-ws.shef.ac.uk` via SSH
- Navigate to `/var/www/shefcompsocuk` to view the git repo
- Switch to the `shefcompsocuk` user by running `sudo su shefcompsocuk`. This is a necessary step due to the owner of the server files
- Run `git pull` to retrieve latest changes from the GitHub repo
- Run `npm run build` to re-build the JS/CSS/image assets (but you can skip this step if you're sure these assets have not changed)
- Run `systemctl restart shefcompsocuk` to restart the server (there is a custom systemd service, **DON'T** run `npm start`)

### Debugging errors on server
- Restart with `sudo reboot`. This just makes the next step quicker and easier.
- As root, in any directory, run `sudo journalctl`. This will show you all logs from all systemd services *since the server was last started*.
- Use the spacebar to jump quickly to the last items in the log. These will be the Node.JS server errors.
- The errors here should be helpful in debugging the issues encountered, especially 500 errors which shut down the entire website.

## Contributors
- Rob Ede
- Ben Clegg
- Brad Sharp
- Russell Penn
- Bhavesh Prajapat
- Alex Yates
- Simon Bone
