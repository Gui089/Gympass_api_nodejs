

export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resources dos note exists");
  }
}