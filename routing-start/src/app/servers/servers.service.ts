import { Server } from "./server/server.interface";

export class ServersService {
  private servers: Server[] = [
    {
      id: 1,
      name: "Productionserver",
      status: "online",
    },
    {
      id: 2,
      name: "Testserver",
      status: "offline",
    },
    {
      id: 3,
      name: "Devserver",
      status: "offline",
      allowEdit: true,
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number): Promise<Server> {
    const server: { name: string, status: string, id: number, allowEdit?: boolean } = this.servers.find((s) => {
      return s.id === id;
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(server);
      }, 300);
    })
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
