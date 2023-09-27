import React, { useState } from "react";

import { useGame, useGameDispatch } from "../../contexts/GameContext";
import {
  PlayerDeleteAction,
  PlayerEditAction,
} from "../../reducers/PlayerReducer";
import { UUID } from "../../types/id";
import {
  Card,
  IconButton,
  TextInput,
  useTheme,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type PlayerViewItemProps = {
  playerId: UUID;
};

const PlayerViewItem = (props: PlayerViewItemProps) => {
  const { playerId } = props;
  const game = useGame();
  const gameDispatch = useGameDispatch();
  const { colors } = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  const submitPlayerDelete = () => {
    const dispatchAction: PlayerDeleteAction = {
      type: "DELETE",
      entity: "PLAYER",
      payload: {
        id: playerId,
      },
    };
    gameDispatch(dispatchAction);
  };

  const nameOrEditName = () =>
    isEdit ? (
      <TextInput
        autoFocus={true}
        onEndEditing={() => setIsEdit(false)}
        textContentType="givenName"
        onChangeText={(text) => {
          submitPlayerEdit(text);
        }}
        contentStyle={{
          fontSize: 24,
        }}
        style={{
          width: "100%",
          flexGrow: 1,
          justifyContent: "center",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        value={game.entities.players.byId[playerId].name}
      />
    ) : (
      <Text style={{ fontSize: 24, paddingLeft: 16, color: colors.onSurface }}>
        {game.entities.players.byId[playerId].name}
      </Text>
    );

  const submitPlayerEdit = (updatedName: string) => {
    const dispatchAction: PlayerEditAction = {
      type: "EDIT",
      entity: "PLAYER",
      payload: {
        id: playerId,
        name: updatedName,
      },
    };
    gameDispatch(dispatchAction);
  };

  return (
    <Card
      mode="elevated"
      style={{
        margin: 5,
        backgroundColor: colors.surface,
      }}
      contentStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Card.Content
        style={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 0,
          paddingTop: 0,
        }}
      >
        {nameOrEditName()}
      </Card.Content>
      <Card.Actions>
        <IconButton
          onPress={submitPlayerDelete}
          mode="contained"
          icon={"trash-can"}
          iconColor={colors.onErrorContainer}
          containerColor={colors.errorContainer}
        />
        <IconButton
          mode="contained"
          onPress={() => setIsEdit(!isEdit)}
          icon="account-edit-outline"
          iconColor={colors.onTertiaryContainer}
          containerColor={colors.tertiaryContainer}
        />
      </Card.Actions>
    </Card>
  );
};

export default PlayerViewItem;
