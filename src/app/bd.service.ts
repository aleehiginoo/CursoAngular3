import { Injectable } from "@angular/core";
import * as firebase from "firebase";

import { Progresso } from "./progresso.service";
import { resolve } from "url";

@Injectable()
export class Bd {
  constructor(private progresso: Progresso) {}

  public publicar(publicacao: any): void {
    firebase
      .database()
      .ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        let nomeImagem = resposta.key;

        firebase
          .storage()
          .ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progresso.status = "andamento";
              this.progresso.estado = snapshot;
            },
            (erro) => {
              this.progresso.status = "erro";
            },
            () => {
              this.progresso.status = "concluido";
            }
          );
      });
  }

  public consultaPublicacoes(email: string): Promise<any> {
    return new Promise((res, rej) => {
      firebase
        .database()
        .ref(`publicacoes/${btoa(email)}`)
        .orderByKey()
        .once("value")
        .then((snapshot: any) => {
          //console.log(snapshot.val());

          let publicacoes: any[] = new Array<any>();

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);
          });
          //res(publicacoes);
          //console.log(publicacoes);

          return publicacoes.reverse();
        })
        .then((publicacoes) => {
          //console.log(publicacoes);
          publicacoes.forEach((publicacao) => {
            firebase
              .storage()
              .ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;
                firebase
                  .database()
                  .ref(`usuario_detalhe/${btoa(email)}`)
                  .once("value")
                  .then((snapShot: any) => {
                    //console.log(snapShot);
                    publicacao.nome_usuario = snapShot.val().nome_usuario;
                  });
              });
          });

          res(publicacoes);
        });
    });
  }
}
