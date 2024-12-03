const votes = {};

// Fetch votes dynamically
function fetchVotes() {
    return votes;
}

// Submit a vote for a project link
function sendVote(link) {
    if (votes[link]) {
        votes[link]++;
    } else {
        votes[link] = 1;
    }
}

// Update the voting section dynamically
function updateVotingSection() {
    const votingContainer = document.getElementById('voting-container');
    const sortedProjects = Object.entries(fetchVotes())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    votingContainer.innerHTML = '';

    sortedProjects.forEach(([link, voteCount]) => {
        const voteItem = document.createElement('div');
        voteItem.classList.add('vote-item');
        voteItem.innerHTML = `
            <span>${link}</span>
            <span>Votes: ${voteCount}</span>
            <button onclick="vote('${link}')">Vote</button>
        `;
        votingContainer.appendChild(voteItem);
    });
}

// Handle new project submission
document.getElementById('feed-dwarf-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const linkInput = document.getElementById('dwarf-link');
    const link = linkInput.value.trim();

    if (!link) {
        alert('Please enter a valid URL.');
        return;
    }

    sendVote(link);
    updateVotingSection();

    linkInput.value = '';
});

// Vote for a project
function vote(link) {
    sendVote(link);
    updateVotingSection();
}

updateVotingSection();
