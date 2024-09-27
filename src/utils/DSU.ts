export class DSU {
    private parent: Map<number, number> = new Map();
  
    constructor(contacts: { id: number; linkedId: number | null }[]) {
      for (const contact of contacts) {
        if (!this.parent.has(contact.id)) {
          this.parent.set(contact.id, contact.linkedId ?? contact.id);
        }
      }
    }
  
    find(x: number): number {
      if (!this.parent.has(x)) {
        return x;
      }
      
      let root = x;
      while (this.parent.get(root) !== root) {
        root = this.parent.get(root)!;
      }
  
      // Path compression
      while (x !== root) {
        const next = this.parent.get(x)!;
        this.parent.set(x, root);
        x = next;
      }
  
      return root;
    }
  
    union(x: number, y: number): void {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) {
        this.parent.set(rootY, rootX);
      }
    }
  }