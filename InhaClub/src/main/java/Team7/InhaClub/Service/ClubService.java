package Team7.InhaClub.Service;

import Team7.InhaClub.Domain.Dto.RequestDto.ClubRequestDto;
import Team7.InhaClub.Domain.Dto.ResponseDto.ClubResponseDto;
import Team7.InhaClub.Domain.Entity.Club;
import Team7.InhaClub.Domain.Entity.Posts;
import Team7.InhaClub.Repository.ClubRepository;
import Team7.InhaClub.Repository.PostsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/** Club 관련 서비스 정의 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final PostsRepository postsRepository;

    /** 동아리 등록 */
    @Transactional
    public Club register(Club _club) {
        Posts posts = new Posts();
        posts.setContent("asdf");
        postsRepository.save(posts);
        _club.setPosts(posts);
        log.info(_club.getClubName() + "is registered.");
        return clubRepository.save(_club);
    }

    // in progress
    /** 동아리 정보 수정 */
    @Transactional
    public void editClubInfo(ClubRequestDto _request) {
        Club club = findByClubId(_request.getId()).orElseThrow(() -> new IllegalArgumentException("Club not found - editClubInfo"));
        club.update(_request);
    }

    /** 동아리 중복 검사 */
    @Transactional
    public void validateDuplicateClubName(String _name) {
        clubRepository.findByClubName(_name)
                .ifPresent(m -> {
                    throw new IllegalStateException("IllegalStateException - Club name is already exist.");
                });
    }

    /** 동아리 삭제 */
    @Transactional
    public void clubDelete(ClubRequestDto clubRequestDto) {
        clubRepository.delete(clubRepository.findByClubName(clubRequestDto.getClubName()).orElseThrow(() -> new IllegalArgumentException("Club is not found. -> " + clubRequestDto.getClubName())));
    }

    /** 모든 동아리 리스트를 넘김 */
    @Transactional
    public List<Club> findClubs() { return clubRepository.findAll(); }

    /** 모든 동아리 리스트의 태그를 넘김 */
    public List<String> findClubTagLists() {
        List<String> output = null;
        for (Club i : clubRepository.findAll()) {
            assert false;
            output.add(i.getTags());
        }
        return output;
    }

    /** 고유 id 로 동아리를 찾음 */
    @Transactional
    public Optional<Club> findByClubId(Long _id) { return clubRepository.findById(_id);}

    /** 동아리 이름으로 동아리를 찾음 */
    @Transactional
    public Optional<Club> findByClubName(String _name) { return clubRepository.findByClubName(_name); }
}
