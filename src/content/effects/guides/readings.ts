type Reading = { title: string; url: string };
const taleb = {
  title: "Nassim Nicholas Taleb — Incerto and research on uncertainty",
  url: "https://www.fooledbyrandomness.com/",
};
const ruin = {
  title: "Matthew Aldridge — Classical gambler's ruin",
  url: "https://mpaldridge.github.io/math2750/S03-gamblers-ruin.html",
};

// Contextual readings supplement older entries; they do not certify authorship.
export const additionalReadings: Record<string, Reading[]> = {
  "lindy-effect": [taleb],
  "fat-tails": [
    {
      title: "Taleb — The Fat Tails Statistical Project",
      url: "https://www.fooledbyrandomness.com/FatTails.html",
    },
  ],
  "kelly-criterion": [
    {
      title: "David Aldous — The Kelly criterion",
      url: "https://www.stat.berkeley.edu/~aldous/Real_World/kelly.html",
    },
  ],
  "base-rate-neglect": [
    {
      title: "Brown University, Seeing Theory — Bayes' theorem",
      url: "https://seeing-theory.brown.edu/bayesian-inference/index.html",
    },
  ],
  "regression-to-the-mean": [
    {
      title: "Penn State — Regression methods and prediction",
      url: "https://online.stat.psu.edu/stat501/",
    },
  ],
  "goodharts-law": [
    {
      title:
        "Research paper — On Goodhart's law, with an application to value alignment",
      url: "https://arxiv.org/abs/2410.09638",
    },
  ],
  "survivorship-bias": [taleb],
  "power-laws": [
    {
      title: "Easley & Kleinberg — Power Laws and Rich-Get-Richer Phenomena",
      url: "https://www.cs.cornell.edu/home/kleinber/networks-book/networks-book-ch18.pdf",
    },
  ],
  "loss-aversion": [
    {
      title: "Daniel Kahneman — Nobel lecture on judgment and choice",
      url: "https://www.nobelprize.org/uploads/2018/06/kahnemann-lecture.pdf",
    },
  ],
  "network-effects": [
    {
      title: "Easley & Kleinberg — Network Effects",
      url: "https://www.cs.cornell.edu/home/kleinber/networks-book/networks-book-ch17.pdf",
    },
  ],
  "principal-agent-problem": [
    {
      title: "Bengt Holmström — Pay for Performance and Beyond",
      url: "https://www.nobelprize.org/uploads/2018/06/holmstrom-lecture.pdf",
    },
  ],
  "risk-of-ruin": [ruin],
  ergodicity: [
    {
      title: "Ole Peters — The ergodicity problem in economics",
      url: "https://www.nature.com/articles/s41567-019-0732-0",
    },
  ],
};
