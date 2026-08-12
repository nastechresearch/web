export type GithubRepo = {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  updated_at: string;
  default_branch: string;
  language: string | null;
  license: { name: string } | null;
};

export type GithubCommit = {
  sha: string;
  commit: { message: string; author: { date: string } };
  html_url: string;
};

export type GithubContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

export type GithubRelease = {
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
};

export type GithubSnapshot = {
  repo: GithubRepo;
  commits: GithubCommit[];
  contributors: GithubContributor[];
  release: GithubRelease | null;
};

const API_ROOT = "https://api.github.com/repos/nastechresearch/NasTech-Agent";

async function readJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
  return response.json() as Promise<T>;
}

async function readOptional<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export async function fetchGithubSnapshot(): Promise<GithubSnapshot> {
  const [repo, commits, contributors, release] = await Promise.all([
    readJson<GithubRepo>(""),
    readJson<GithubCommit[]>("/commits?per_page=4"),
    readJson<GithubContributor[]>("/contributors?per_page=8"),
    readOptional<GithubRelease>("/releases/latest"),
  ]);

  return { repo, commits, contributors, release };
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatRelativeDate(date: string): string {
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}
