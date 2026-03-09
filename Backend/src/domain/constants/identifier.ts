const RepositoryTokens = {
    UserRepository: Symbol.for('UserRepository'),
    RoomRepository: Symbol.for('RoomRepository'),
    MessageRepository: Symbol.for('MessageRepository'),
}

const UseCaseTokens = {
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    LoginUserUseCase: Symbol.for('LoginUserUseCase'),
    FindUserUseCase: Symbol.for('FindUserUseCase'),

    CreateRoomUseCase: Symbol.for('CreateRoomUseCase'),
    JoinRoomUseCase: Symbol.for('JoinRoomUseCase'),
    RoomDetailsUseCase: Symbol.for('RoomDetailsUseCase'),
    GetUserRoomsUsecase: Symbol.for('GetUserRoomsUsecase'),

    CreatePollUseCase: Symbol.for('CreatePollUseCase'),
    VoteUseCase: Symbol.for('VoteUseCase'),
    SendMessageUseCase: Symbol.for('SendMessageUseCase'),
    EditMessageUseCase: Symbol.for('EditMessageUseCase'),
}

const ServiceTokens = {
    IDGenerator: Symbol.for('IDGenerator'),
    TokenService: Symbol.for('TokenService'),
}


export const DI_TOKENS = {
    ...RepositoryTokens,
    ...UseCaseTokens,
    ...ServiceTokens
}