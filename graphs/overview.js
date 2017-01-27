'use strict'

function getData (options) {
  return {
    'total_updates': {
      '2015': getTotalUpdatesForRepos(options.repos[ '2015' ]),
      '2016': getTotalUpdatesForRepos(options.repos[ '2016' ]),
      '2017': getTotalUpdatesForRepos(options.repos[ '2017' ])
    },
    'total_repos': {
      '2015': getTotalUniqRepos(options.repos[ '2015' ]),
      '2016': getTotalUniqRepos(options.repos[ '2016' ]),
      '2017': getTotalUniqRepos(options.repos[ '2017' ])
    },
    'total_events': {
      '2015': getTotalEvents(options.events[ '2015' ]),
      '2016': getTotalEvents(options.events[ '2016' ]),
      '2017': getTotalEvents(options.events[ '2017' ])
    },
    'total_groups': {
      '2015': getTotalGroups(options.events[ '2015' ]),
      '2016': getTotalGroups(options.events[ '2016' ]),
      '2017': getTotalGroups(options.events[ '2017' ])
    }
  }
}

function getTotalUpdatesForRepos (reposSource) {
  var answer = 0

  reposSource.forEach(function (filename) {
    answer += require('.' + filename).repos.length
  })

  return answer
}

function getTotalUniqRepos (reposSource) {
  var answer = []

  reposSource.forEach(function (filename) {
    require('.' + filename).repos.forEach(function (repo) {
      if (answer.indexOf(repo.name) < 0) {
        answer.push(repo.name)
      }
    })
  })

  return answer.length
}

function getTotalEvents (eventSource) {
  var answer = 0

  eventSource.forEach(function (filename) {
    answer += require('.' + filename).events.length
  })

  return answer
}

function getTotalGroups (eventSource) {
  var answer = []

  eventSource.forEach(function (filename) {
    require('.' + filename).events.forEach(function (ev) {
      if (answer.indexOf(ev.group_name) < 0) {
        answer.push(ev.group_name)
      }
    })
  })

  return answer.length
}

exports.getData = getData
